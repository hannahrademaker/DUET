const conn = require("./conn");
const { UUID, UUIDV4, DATE } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const FriendShips = conn.define("friendships", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  createdAt: {
    type: DATE,
    defaultValue: Date.now(),
  },
  requesterId:{
      type: UUID,
      allowNull: false
  },
  accepterId:{
      type: UUID,
      allowNull: false
  }
});

module.exports = FriendShips;
