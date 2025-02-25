const express = require("express");
const router = express.Router();
const userController = require("../../controllers/User/userServices");

router
  .put("/update-profile", userController.updateUser)
  .put("/change-role", userController.setPremiumUser)
  .get("/status-page/myBookings", userController.myBookings)
  .get("/homePage/getAllServices", userController.allServices);

module.exports = router;
