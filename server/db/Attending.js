const conn = require("./conn");
const { UUID, UUIDV4, STRING } = conn.Sequelize;
const User = require("./User");

const Attending = conn.define("attending", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  eventId: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Attending;
