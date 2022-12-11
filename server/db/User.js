const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER, VIRTUAL, ARRAY } =
  conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define(
  "user",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    username: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isAdmin: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    avatar: {
      type: TEXT,
      defaultValue: "",
      get: function () {
        const prefixPNG = "data:image/png;base64,";
        const prefixJPG = "data:image/jpeg;base64,";
        const data = this.getDataValue("avatar") || "";
        if (data.startsWith(prefixPNG)) {
          return data;
        } else if (data.startsWith(prefixJPG)) {
          return data;
        } else if (!data) {
          return null;
        }
        return `${prefixPNG}${data}`;
      },
    },
    bio: {
      type: TEXT,
    },
    email: {
      type: STRING,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: STRING,
    },
    lastName: {
      type: STRING,
    },
    address: {
      type: STRING,
      defaultValue: "123 Maple Street",
    },
    addressDetails: {
      type: STRING,
      defaultValue: "",
    },
    city: {
      type: STRING,
      defaultValue: "Anytown",
    },
    state: {
      type: STRING,
      defaultValue: "NY",
    },
    zip: {
      type: INTEGER,
      defaultValue: 10036,
    },
    requestedFrom: {
      type: ARRAY(TEXT),
    },
  },
  {
    paranoid: true,
  }
);

User.prototype.findThisUser = async function () {
  try {
    const currentUser = await User.findByPk(this.id);
    console.log(currentUser);
    return currentUser;
  } catch (err) {
    return err;
  }
};

User.prototype.friendsRequestedUser = async function (user) {
  try {
    // let thisUser = await this.models.getRequester({
    //   where: { id: this.id },
    // });
    // console.log(thisUser);
    // return thisUser
    const currentUser = await this.findThisUser();
    const requestUser = await this.models.Requester.findOne({
      where: { id: user.id },
    });
    currentUser.addRequester(requestUser);
    return currentUser.getRequester();
  } catch (err) {
    return err;
  }
};

User.prototype.createFriendRequest = async function (obj) {
  let requestedFriends = await conn.models.friendship.create({
    requesterId: this.id,
    accepterId: obj.id,
  });
  return requestedFriends;
};

User.prototype.findFriends = async function () {
  let friendsRequestedAcceptedUser = await conn.models.friendships.findAll({
    where: {
      requestedId: this.id,
      status: "accepted",
    },
  });
  let friendsRequestedUserAccepted = await conn.models.friendships.findAll({
    where: {
      accepterId: this.id,
      status: "accepted",
    },
  });
  let friends = friendsRequestedAcceptedUser.concat(
    friendsRequestedUserAccepted
  );
  return friends;
};

User.prototype.requestUser = async function ({ user }) {
  try {
    const currentUser = await this.findThisUser();
    const toRequestUser = await conn.models.requester.findOne({
      where: { id: user.id },
    });
    currentUser.addUser(toRequestUser);
    console.log(currentUser.getUser());
    return currentUser.getUser();
  } catch (err) {
    return err;
  }
};

// User.prototype.sendFriendRequest = async function ({user}) {
//   let friendship = await conn.models.requester.findOne({
//     where: {
//       requesterId: this.id,
//       relationship: "pending",
//     },
//   });
//   if (!friendship) {
//     friendship = await conn.models.friendship.create({
//       requesterId: this.id,
//     });
//   }
//   return friendship;
// };

User.prototype.acceptFriendRequest = async function () {
  const friendship = await this.sendFriendRequest();
  friendship.accepter = this.id;
  friendship.relationship = "accepted";
  await friendship.save();
  return friendship;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id, {
      include: [
        conn.models.attending,
        conn.models.friendship,
        {
          model: User,
          as: "Requester",
          attributes: {
            exclude: ["password", "address", "addressDetails"],
          },
        },
        {
          model: User,
          as: "Accepter",
          attributes: {
            exclude: ["password", "address", "addressDetails"],
          },
        },
      ],
    });
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
