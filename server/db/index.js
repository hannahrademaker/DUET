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
  as: "friend",
  through: "Friendship",
  //uniqueKey: "friendshipId",
});
Friendship.hasMany(User);
//Friendship.belongsToMany(User);
// User.hasMany(Friendship);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const avatar = await getImage(
    path.join(__dirname, "../../static/DUET/Moe_Szyslak.png")
  );

  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123", avatar }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  const [friendship] = await Promise.all([
    Friendship.create({ requesterId: moe.id, accepterId: lucy.id }),
  ]);

  moe.friendshipId = friendship.id;
  lucy.friendshipId = friendship.id;

  moe.save();
  lucy.save();

  console.log(friendship);

  const test = () => {
    let friend;
    if (lucy.id === friendship.requesterId) {
      friend = friendship.accepterId;
    } else {
      friend = friendship.requesterId;
    }
    return friend;
  };

  console.log(test(lucy));
  // console.log(User_Friendships)
  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    friendship,
  };
};

module.exports = {
  syncAndSeed,
  User,
  Friendship,
};
