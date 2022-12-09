const express = require("express");
const app = express.Router();
const { User, Friendship } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

// app.get("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const friends = await Friendship.findAll();
//     res.send(friends);
//   } catch (err) {
//     next(err);
//   }
// });

app.get("/", async (req, res, next) => {
  try {
    res.send(
      JSON.stringify(
        await User.findAll({
          include: [
            {
              model: User,
              as: "requester",
              attributes: {
                exclude: ["password", "address", "addressDetails"],
              },
            },
            {
              model: User,
              as: "accepter",
              attributes: {
                exclude: ["password", "address", "addressDetails"],
              },
            },
          ],
        })
      )
    );
  } catch (err) {
    next(err);
  }
});

app.put("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
