const express = require("express");
const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");
const findProvider = require("./routes/FindProvider");

const server = express();

server.use(express.json());
server.use("/auth", authRoutes);
server.use("/user/book", findProvider);

server.get("/", (req, res) => {
  res.status(200).json({ message: " server is running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
