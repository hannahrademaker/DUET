const conn = require("./conn");
const User = require("./User");
const Friendship = require("./Friendship");
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
User.hasMany(Friendship, { foreignKey: "requesterId" });
User.hasMany(Friendship, { foreignKey: "accepterId" });

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
    User.create({
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Goosey",
      address: "Old Town Road",
    }),
    User.create({
      username: "larry",
      password: "123",
      firstName: "Larry",
      lastName: "Mariah-Carey",
    }),
    User.create({
      username: "ethyl",
      password: "123",
      firstName: "Ethyl",
      lastName: "Bobethyl",
    }),
  ]);

  const [fs1, fs2, fs3] = await Promise.all([
    Friendship.create({ requesterId: moe.id, accepterId: lucy.id }),
    Friendship.create({ requesterId: lucy.id, accepterId: ethyl.id }),
    Friendship.create({ requesterId: larry.id, accepterId: ethyl.id }),
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
  };
};

module.exports = {
  syncAndSeed,
  User,
  Friendship,
};
