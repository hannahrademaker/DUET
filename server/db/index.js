const conn = require("./conn");
const User = require("./User");
const Friendship = require("./Friendship");
const Attending = require("./Attending");
const Comment = require("./Comment");
const Post = require("./Post");
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
  as: "Requester",
  through: Friendship,
  foreignKey: "requesterId",
  //uniqueKey: "friendshipId",
});
User.belongsToMany(User, {
  as: "Accepter",
  through: Friendship,
  foreignKey: "accepterId",
  //uniqueKey: "friendshipId",
});

User.hasMany(Friendship, {
  foreignKey: "requesterId",
  onDelete: "CASCADE",
});
User.hasMany(Friendship, { foreignKey: "accepterId", onDelete: "CASCADE" });
User.hasMany(Attending, { onDelete: "CASCADE" });
//Friendship.belongsTo(User);
//Friendship.belongsTo(User);
Attending.belongsTo(User);
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  // const avatar = await getImage(
  //   path.join(__dirname, "../../static/DUET/Moe_Szyslak.png")
  // );

  const [moe, lucy, larry, ethyl, hannah, anisah, alex, justin] =
    await Promise.all([
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
        requestedFrom: ["007"],
      }),
      User.create({
        username: "hannah",
        password: "123",
        firstName: "Hannah",
        lastName: "Rademaker",
        bio: "Hi! My name is hannah! I love going to concerts and hanging out with friends!",
        img: "../static/DUET/hannahavatar.png",
      }),
      User.create({
        username: "anisah",
        password: "123",
        firstName: "Anisah",
        lastName: "M",
        bio: "Hi! My name is anisah! I love going to concerts and hanging out with friends!",
        img: "../static/DUET/anisahavatar.png",
      }),
      User.create({
        username: "alex",
        password: "123",
        firstName: "Alex",
        lastName: "M",
        bio: "Hi! My name is alex! I love going to concerts and hanging out with friends!",
        img: "../static/DUET/alexavatar.png",
      }),
      User.create({
        username: "justin",
        password: "123",
        firstName: "Justin",
        lastName: "M",
        bio: "Hi! My name is justin! I love going to concerts and hanging out with friends!",
        img: "../static/DUET/justinavatar.png",
      }),
    ]);

  const [fs1, fs2, fs3] = await Promise.all([
    Friendship.create({
      requesterId: moe.id,
      accepterId: lucy.id,
    }),
    Friendship.create({ requesterId: lucy.id, accepterId: ethyl.id }),
    Friendship.create({ requesterId: larry.id, accepterId: ethyl.id }),
  ]);

  const [comment1, comment2, comment3, comment4] = await Promise.all([
    Comment.create({
      userId: moe.id,
      caption: "I love the Nets! Who wants to hang out and watch the game?",
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Comment.create({
      userId: lucy.id,
      caption: "I really want to go to this event! who wants to join?",
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Comment.create({
      userId: ethyl.id,
      caption: "This is a comment",
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Comment.create({
      userId: larry.id,
      caption:
        "Hey guys, I'm going to this event! None of my friends like Shinia Twain, who wants to join me?",
      eventId: "G5diZ94NPjotW",
    }),
  ]);

  const [post1, post2, post3] = await Promise.all([
    Post.create({
      userId: moe.id,
      caption: "Looking for a friend to walk dogs with!",
      createdAt: "2021-06-01",
      body: "I love dogs and I love walking. I'm looking for a friend to walk dogs with!",
    }),
    Post.create({
      userId: lucy.id,
      caption: "Im new to tennis and I need a friend to play with!",
      createdAt: "2021-06-01",
      body: "I love tennis and I love playing. I'm looking for a friend to play tennis with!",
    }),
    Post.create({
      userId: ethyl.id,
      caption: "I love to cook and I need a friend to cook with!",
      createdAt: "2021-06-01",
      body: "I love cooking and I love eating. I'm looking for a friend to cook with!",
    }),
  ]);

  const [test1, test2, test3] = await Promise.all([
    Attending.create({
      userId: moe.id,
      isAttending: true,
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Attending.create({
      userId: lucy.id,
      isAttending: true,
      eventId: "Z7r9jZ1Ad4s-N",
    }),
    Attending.create({
      userId: hannah.id,
      isAttending: true,
      eventId: "Z7r9jZ1Ad4s-N",
    }),
  ]);

  //console.log(test1);
  // console.log(test2);
  // console.log(ethyl.requestedFrom.includes("00"));
  // console.log(fs1);
  // console.log(lucy.findThisUser());
  console.log(lucy.findThisUser());

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
  //console.log(User_Friendships)
  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
      hannah,
      anisah,
      alex,
      justin,
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
      comment4,
    },
    attendings: {
      test1,
      test2,
      test3,
    },
    posts: {
      post1,
      post2,
      post3,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Friendship,
  Comment,
  Attending,
  Post,
};
