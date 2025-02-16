const express = require("express");
const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");

const server = express();

server.use(express.json());
server.use("/auth", authRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
