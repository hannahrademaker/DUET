const conn = require("./conn");
const User = require("./User");
const Friendships = require("./Friendships");
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

//User.belongsToMany(User, { as: "friend", through: "Friended" });
Friendships.hasMany(User);
Friendships.belongsTo(User);
User.hasMany(Friendships);

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

  const [friendships] = await Promise.all([
    Friendships.create({ requesterId: moe.id, accepterId: lucy.id }),
  ]);

  moe.friendshipId = friendships.id;
  lucy.friendshipId = friendships.id;

  moe.save();
  lucy.save();

  console.log(friendships);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    friendships,
  };
};

module.exports = {
  syncAndSeed,
  User,
  Friendships,
};
