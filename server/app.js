const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

// used to build server with socket.io
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("leave", (data) => {
    socket.disconnect();
    console.log(`User with ID: ${socket.id} left room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/events", require("./api/events"));
app.use("/api/auth", require("./api/auth"));
app.use("/api/friends", require("./api/friends"));
app.use("/api/comments", require("./api/comments"));
app.use("/api/users", require("./api/users"));
app.use("/api/friendships", require("./api/friendships"));
app.use("/api/onlineUsers", require("./api/onlineUsers"));
app.use("/api/posts", require("./api/posts"));

module.exports = app;
