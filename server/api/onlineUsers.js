const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const socketUserMap = require("../db/socketUserMap");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const users = Object.values(socketUserMap)
      .filter((value) => value.user.id !== req.user.id)
      .map((value) => value.user);
    res.send(users);
  } catch (ex) {
    next(ex);
  }
});
