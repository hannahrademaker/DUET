const express = require("express");
const app = express.Router();
const { Comment } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.send(comments);
  } catch (ex) {
    next(ex);
  }
});

// app.post("/", async (req, res, next) => {
//   try {
//     res.send(await Comments.create(req.body));
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.put("/:id", async (req, res, next) => {
//   try {
//     const comment = await Comments.findByPk(req.params.id);
//     await comment.update(req.body);
//     res.send(comment);
//   } catch (ex) {
//     next(ex);
//   }
// });
