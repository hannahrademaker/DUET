const express = require("express");
const app = express.Router();
const { User, Friendships } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const friends = await Friendships.findAll();
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

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
