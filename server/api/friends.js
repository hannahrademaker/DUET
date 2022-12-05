const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

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
