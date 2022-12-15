const express = require("express");
const app = express.Router();
const { User, Attending } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        include: [
          {
            model: User,
            as: "Requester",
            attributes: {
              exclude: ["password", "address", "addressDetails"],
            },
          },
          {
            model: User,
            as: "Accepter",
            attributes: {
              exclude: ["password", "address", "addressDetails"],
            },
          },
          {
            model: Attending,
            // as: "attending",
          },
        ],
      })
    );
  } catch (err) {
    next(err);
  }
});
