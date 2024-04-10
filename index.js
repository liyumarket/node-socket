const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./config.env",
});

const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUitls");

const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;

  next();
};

// CORS
app.use(cors());

// ROUTES
app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
  req.io.emit("message", `Hello, ${req.originalUrl}`);
  res.send("hello world!");
});

// POST route
app.post("/board", (req, res) => {
  // Handle POST request here
  res.send({
    "gameData": { "board": [[12, 24, 45, 51, 65], [8, 16, 42, 53, 62], [15, 19, "*", 59, 64], [7, 25, 39, 56, 70], [14, 20, 32, 48, 74]], "lastCalledNumber": [] }
    , "game_room": "Game38"
    , "game_type": "mode2"
    , "betAmount": 20
    , "player_paid_amount": "-"
  });
});
// POST route
app.post("/leaveGame", (req, res) => {
  // Handle POST request here
  res.send({
    "status": "ok"
  });
});// POST route
app.post("/gameOver", (req, res) => {
  // Handle POST request here
  res.send({
    "status": "ok", "gameData": { "board": [[12, 24, 45, 51, 65], [8, 16, 42, 53, 62], [15, 19, "*", 59, 64], [7, 25, 39, 56, 70], [14, 20, 32, 48, 74]], "lastCalledNumber": [7, 14, 78, 25, 70] }, "win": true
  });
});
// LISTEN
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});