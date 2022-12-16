const express = require("express");
const app = express.Router();
const { Attending } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await Attending.findAll());
  } catch (err) {
    next(err);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await Attending.create(req.body));
  } catch (err) {
    next(err);
  }
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const event = await Attending.findByPk(req.params.id);
    res.send(await event.update(req.body));
  } catch (err) {
    next(err);
  }
});
