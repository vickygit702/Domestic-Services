const express = require("express");
const router = express.Router();
const userController = require("../../controllers/User/userServices");

router
  .put("/update-profile/:id", userController.updateUser)
  .put("/change-role/:id", userController.setPremiumUser)
  .get("/status-page/myBookings", userController.myBookings)
  .get("/homePage", userController.allServices);

module.exports = router;
