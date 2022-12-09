const express = require("express");
const app = express.Router();
const { User, Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

// app.get("/friendships", isLoggedIn, async (req, res, next) => {
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
      JSON.stringify(
        await User.findAll({
          include: [
            {
              model: User,
              as: "requester",
              attributes: {
                exclude: ["password", "address", "addressDetails"],
              },
            },
            {
              model: User,
              as: "accepter",
              attributes: {
                exclude: ["password", "address", "addressDetails"],
              },
            },
          ],
        })
      )
    );
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    res.send();
  } catch (err) {
    next(err);
  }
});
