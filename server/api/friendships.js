const express = require("express");
const app = express.Router();
const { Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    let newFriendship = await Friendship.create(req.body);
    res.send(newFriendship);
  } catch (err) {
    next(err);
  }
});

app.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const friendship = await Friendship.findByPk(req.body.id);
    friendship.update(req.body);
    res.send(friendship);
  } catch (err) {
    next(err);
  }
});

app.delete("/", async (req, res, next) => {
  try {
    console.log(req.params);
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
