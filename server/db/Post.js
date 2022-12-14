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

const Post = conn.define("post", {
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
    allowNull: false,
  },
  caption: {
    type: TEXT,
    allowNull: false,
  },
  body: {
    type: TEXT,
    allowNull: false,
  },
  img: {
    type: STRING,
    allowNull: true,
  },
  eventId: {
    type: STRING,
    allowNull: true,
  },
});

module.exports = Post;
