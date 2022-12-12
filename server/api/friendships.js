const express = require("express");
const app = express.Router();
const { Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.createFriendRequest(req.body));
  } catch (err) {
    next(err);
  }
});

// app.get("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const user = req.user;
//     //const friends = await user.findFriends();
//     res.send(await user.findFriends());
//   } catch (err) {
//     next(err);
//   }
// });
