const express = require("express");
const app = express.Router();
const { Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/friendships", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await Friendship.findAll());
  } catch (err) {
    next(err);
  }
});
