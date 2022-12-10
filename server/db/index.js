const conn = require("./conn");
const User = require("./User");
const Friendship = require("./Friendship");
const Attending = require("./Attending");
const Interested = require("./Interested");
const Comment = require("./Comment");
const path = require("path");
const fs = require("fs");

const getImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "base64", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

User.belongsToMany(User, {
  as: "requester",
  through: Friendship,
  foreignKey: "requesterId",
  //uniqueKey: "friendshipId",
});
User.belongsToMany(User, {
  as: "accepter",
  through: Friendship,
  foreignKey: "accepterId",
  //uniqueKey: "friendshipId",
});

User.hasMany(Friendship, { foreignKey: "requesterId", onDelete: "CASCADE" });
User.hasMany(Friendship, { foreignKey: "accepterId", onDelete: "CASCADE" });
User.hasMany(Attending, { onDelete: "CASCADE" });
User.hasMany(Interested, { onDelete: "CASCADE" });
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  // const avatar = await getImage(
  //   path.join(__dirname, "../../static/DUET/Moe_Szyslak.png")
  // );

  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      firstName: "Moe",
      lastName: "Money",
      bio: "Hi! My name is Moe! My favorite genres of music are bubble gum pop and hardcore rap.",
    }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  const [fs1, fs2, fs3] = await Promise.all([
    Friendship.create({ requesterId: moe.id, accepterId: lucy.id }),
    Friendship.create({ requesterId: lucy.id, accepterId: ethyl.id }),
    Friendship.create({ requesterId: larry.id, accepterId: ethyl.id }),
  ]);

  const [comment1, comment2, comment3] = await Promise.all([
    Comment.create({
      userId: moe.id,
      caption: "This is a comment",
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Comment.create({
      userId: lucy.id,
      caption: "This is a comment",
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Comment.create({
      userId: ethyl.id,
      caption: "This is a comment",
      eventId: "Z7r9jZ1Ad4s-N",
    }),
  ]);

  // console.log(fs1);
  // console.log(fs2);
  // console.log(fs3);
  // console.log(lucy);
  // console.log(moe.id);

  // const test = () => {
  //   let friend;
  //   if (lucy.id === friendship.requesterId) {
  //     friend = friendship.accepterId;
  //   } else {
  //     friend = friendship.requesterId;
  //   }
  //   return friend;
  // };

  // console.log(test(lucy));
  // console.log(User_Friendships)
  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    friendships: {
      fs1,
      fs2,
      fs3,
    },
    comments: {
      comment1,
      comment2,
      comment3,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Friendship,
  Comment,
};
