const express = require("express");
const app = express.Router();
const { Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    const createFriendship = user.createFriendRequest(req.body);
    res.send(await createFriendship);
  } catch (err) {
    next(err);
  }
});

app.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    const acceptFriendship = user.acceptFriendRequest(req.body);
    res.send(await acceptFriendship);
  } catch (err) {
    next(err);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const friendships = await Friendship.findAll();
    res.send(friendships);
  } catch (err) {
    next(err);
  }
});
