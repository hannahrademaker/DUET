const express = require("express");
const app = express.Router();
const { User, Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

// app.get("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const friends = await Friendship.findAll({
//       include: [{ model: User }],
//     });
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
          include: [{ model: User, as: "friend" }],
        })
      )
    );
  } catch (err) {
    next(err);
  }
});
