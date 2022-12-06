const conn = require("./conn");
const User = require("./User");
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

User.belongsToMany(User, { as: "friend", through: "Friended" });

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

  moe.friendId = lucy.id;
  lucy.friendId = moe.id;
  ethyl.friendId = moe.id;
  lucy.friendId = ethyl.id;

  await Promise.all([moe.save(), lucy.save(), ethyl.save()]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
};
