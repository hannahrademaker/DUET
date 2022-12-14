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

app.delete(
  "/:id",
  /*isLoggedIn,*/ async (req, res, next) => {
    try {
      // const user = req.user;
      // const deleteFriendship = await user.unfriendUser(req.body);
      // res.send(await deleteFriendship);
      //const friendship = await Friendship.findByPk(req.params.id);
      // if (friendship) {
      //   if (
      //     friendship.requesterId === user.id ||
      //     friendship.accepterId === user.id
      //   ) {
      //     await friendship.destroy();
      //     res.sendStatus(204);
      //   } else {
      //     res.sendStatus(403);
      //   }
      // } else {
      //   res.sendStatus(404);
      // }
      const friendship = await Friendship.findByPk(req.params.id);
      await friendship.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

app.get("/", async (req, res, next) => {
  try {
    const friendships = await Friendship.findAll();
    res.send(friendships);
  } catch (err) {
    next(err);
  }
});
