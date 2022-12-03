const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));

// app.get('/discovery/v2/events', async(req, res, next)=>{

//     const { apikey, secret } = process.env;
//     const rooturl = `https://app.ticketmaster.com/discovery/v2/events.json?${apikey}`
// })

module.exports = app;
