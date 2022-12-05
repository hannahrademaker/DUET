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

const Comments = conn.define("comments", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  caption: {
    type: TEXT,
    allowNull: false,
  },
});

module.exports = Comments;
