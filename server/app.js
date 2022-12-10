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

// app.get('/discovery/v2/events', async(req, res, next)=>{
//     const { apikey, secret } = process.env;
//     const rooturl = `https://app.ticketmaster.com/discovery/v2/events.json?${apikey}`
// })

module.exports = app;
