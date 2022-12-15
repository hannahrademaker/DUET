const conn = require("./conn");
const User = require("./User");
const Friendship = require("./Friendship");
const Attending = require("./Attending");
const Comment = require("./Comment");
const Post = require("./Post");
const path = require("path");
const fs = require("fs");

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

  const [fs1, fs2, fs3, fs4] = await Promise.all([
    Friendship.create({
      requesterId: moe.id,
      accepterId: lucy.id,
      status: "accepted",
    }),
    Friendship.create({
      requesterId: lucy.id,
      accepterId: ethyl.id,
      status: "accepted",
    }),
    Friendship.create({
      requesterId: larry.id,
      accepterId: ethyl.id,
      status: "accepted",
    }),
    Friendship.create({
      requesterId: lucy.id,
      accepterId: larry.id,
      status: "pending",
    }),
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
      userId: justin.id,
      caption: "Looking for a friend to walk dogs with!",
      createdAt: "2021-06-01",
      body: "I love to hike and looking for a friend to walk our dogs with! My dog is super friendly and we love to go upsate",
      img: "https://media.istockphoto.com/id/1143749718/photo/concept-of-healthy-lifestyle-with-dog-and-man-hiking-outdoor.jpg?s=612x612&w=0&k=20&c=ox7p2XYECBnABDoDw2g832CIAeHgD7Bqaj7fmP_BOb4=",
    }),
    Post.create({
      userId: alex.id,
      caption: "Im new to tennis and I need a friend to play with!",
      createdAt: "2021-06-01",
      body: "I love tennis and I love playing. I'm looking for a friend to play tennis with!",
      img: "../static/DUET/tennis.jpg",
    }),
    Post.create({
      userId: hannah.id,
      caption: "Learning to cook instead of ordering takeout!",
      createdAt: "2021-06-01",
      body: "Does anyone want to take a cooking class with me? I am tyring to learn to cook and would love to find people in NYC to cook with!",
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
    Attending.create({
      userId: anisah.id,
      isAttending: true,
      eventId: "G5diZ94NPjotW",
    }),
  ]);

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
