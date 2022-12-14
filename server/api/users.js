const express = require("express");
const app = express.Router();
const { User, Attending, conn, Friendship } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
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
        {
          model: Friendship,
        },
      ],
    });
    res.send(users);
  } catch (ex) {
    next(ex);
  }
});

// app.post("/", async (req, res, next) => {
//   try {
//     res.send();
//   } catch (err) {
//     next(err);
//   }
// });
