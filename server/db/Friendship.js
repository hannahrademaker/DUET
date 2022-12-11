const conn = require("./conn");
const { UUID, UUIDV4, DATE, STRING, INTEGER, VIRTUAL, ENUM } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const Friendship = conn.define("friendship", {
  // id: {
  //   type: UUID,
  //   defaultValue: UUIDV4,
  //   allowNull: false,
  //   primaryKey: true,
  // },
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
  relationship: {
    type: ENUM("pending", "accepted", "rejected", "blocked"),
    allowNull: false,
    defaultValue: "pending",
  },
  createdAt: {
    type: DATE,
    defaultValue: Date.now(),
  },
});

module.exports = Friendship;
