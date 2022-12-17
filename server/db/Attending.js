const conn = require("./conn");
const { UUID, UUIDV4, STRING, BOOLEAN, VIRTUAL } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const Attending = conn.define("attending", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  eventId: {
    type: STRING,
    allowNull: true,
  },
  isAttending: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Attending;
