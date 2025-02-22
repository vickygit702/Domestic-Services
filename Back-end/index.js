const express = require("express");
const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");
const bookRoutes = require("./routes/userHome/Bookings/FindProvider");
const userRoutes = require("./routes/userHome/FetchServices");
const adminRoutes = require("./routes/admin/AdminPage");

const server = express();

server.use(express.json());
server.use("/auth/api", authRoutes);
server.use("/user", userRoutes);
server.use("/booking/api", bookRoutes);

server.use("/admin", adminRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: " server is running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
