const express = require("express");
const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");
const adminRoutes = require("./routes/admin/AdminPage");

const server = express();

server.use(express.json());
server.use("/auth/api", authRoutes);
server.use("/admin", adminRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: " server is running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
