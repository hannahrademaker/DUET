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
  // id: {
  //   type: VIRTUAL,
  //   primaryKey: true,
  //   get() {
  //     return this.requesterId + this.accepterId;
  //   },
  //},
});

module.exports = Friendship;
