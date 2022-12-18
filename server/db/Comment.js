const conn = require("./conn");
const {
  STRING,
  UUID,
  UUIDV4,
  TEXT,
  BOOLEAN,
  INTEGER,
  VIRTUAL,
  DATE,
  DATEONLY,
} = conn.Sequelize;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const Comment = conn.define("comment", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  createdAt: {
    type: DATE,
    allowNull: true,
    defaultValue: Date.now(),
  },
  userId: {
    type: UUID,
    allowNull: true,
  },
  caption: {
    type: TEXT,
    allowNull: false,
  },
  eventId: {
    type: STRING,
    allowNull: true,
  },
  postId: {
    type: UUID,
    allowNull: true,
  },
});

module.exports = Comment;
