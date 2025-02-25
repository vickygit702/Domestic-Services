const express = require("express");
require("./utils/cronJobs");

const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");
const adminRoutes = require("./routes/admin/AdminPage");
const userRoutes = require("./routes/user/userPage");
const bookingRoute = require("./routes/booking/booking-service");

const server = express();

server.use(express.json());
server.use("/auth/api", authRoutes);
server.use("/admin", adminRoutes);
server.use("/service/booking", bookingRoute);
server.use("/user", userRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: " server is running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
