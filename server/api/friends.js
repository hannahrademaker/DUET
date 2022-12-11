const express = require("express");
const app = express.Router();
const { User, Friendship, Attending } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

// app.get("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const friends = await Friendship.findAll();
//     res.send(friends);
//   } catch (err) {
//     next(err);
//   }
// });

app.get("/", async (req, res, next) => {
  try {
    res.send(
      // JSON.stringify(
      await User.findAll({
        include: [
          // {
          //   model: User,
          //   as: "requester",
          //   attributes: {
          //     exclude: ["password", "address", "addressDetails"],
          //   },
          // },
          // {
          //   model: User,
          //   as: "accepter",
          //   attributes: {
          //     exclude: ["password", "address", "addressDetails"],
          //   },
          // },
          {
            model: Attending,
            // as: "attending",
          },
        ],
      })
    );
    //  );
  } catch (err) {
    next(err);
  }
});
// app.put("/friends", async (req, res, next) => {
//   try {
//     const friendsRequested = await this.requestUser();
//     console.log(friendsRequested);
//     res.send(friendsRequested);
//   } catch (err) {
//     next(err);
//   }
// });

app.get("/friendships", async (req, res) => {
  try {
    const requestedList = await User.friendsRequestedUser();
    console.log(requestedList);
    res.send(requestedList);
  } catch (err) {
    return err;
  }
});
