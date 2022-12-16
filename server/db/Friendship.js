const conn = require("./conn");
const { UUID, UUIDV4, DATE, STRING, INTEGER, VIRTUAL, ENUM, ARRAY, TEXT } =
  conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const Friendship = conn.define("friendship", {
  ids: {
    type: VIRTUAL,
    get() {
      return [this.accepterId, this.requesterId];
    },
  },
  requesterId: {
    type: UUID,
    //primaryKey: true,
    // references: {
    //   model: User,
    //   key: "id",
    // },
  },
  accepterId: {
    type: UUID,
    //primaryKey: true,
    // references: {
    //   model: User,
    //   key: "id",
    // },
  },
  status: {
    type: ENUM("pending", "accepted", "rejected", "blocked"),
    allowNull: false,
    defaultValue: "pending",
  },
  createdAt: {
    type: DATE,
    defaultValue: Date.now(),
  },
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Friendship;
