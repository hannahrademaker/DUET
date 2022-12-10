const app = require("./app");
const { syncAndSeed, User } = require("./db");
const { Server } = require("socket.io");
const socketUserMap = require("./db/socketUserMap");

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () =>
      console.log(`listening on port ${port}`)
    );
    const socketServer = new Server(server);
    socketServer.on("connection", (socket) => {
      let user;
      socket.on("auth", async (token) => {
        user = await User.findByToken(token);
        socket.broadcast.emit("userEntered", user);
        socketUserMap[user.id] = { user, socket };
      });
      socket.on("disconnect", () => {
        if (user) {
          socket.broadcast.emit("userLeft", user);
          delete socketUserMap[user.id];
        }
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
