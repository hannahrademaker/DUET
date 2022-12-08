const conn = require("./conn");
const { UUID, UUIDV4, DATE, STRING, INTEGER, VIRTUAL } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const Friendship = conn.define("friendship", {
  createdAt: {
    type: DATE,
    defaultValue: Date.now(),
  },
  requesterId: {
    type: UUID,
    //primaryKey: true,
    allowNull: false,
  },
  accepterId: {
    type: UUID,
    //primaryKey: true,
    allowNull: false,
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
});

module.exports = Friendship;
