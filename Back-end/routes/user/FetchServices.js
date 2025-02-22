const express = require("express");
const router = express.Router();
const userController = require("../../controllers/User/FetchServices");

router
  .put("/:id", userController.updateUser)
  .put("/:id", userController.setPremiumUser)
  .get("/myBookings", userController.myBookings)
  .get("/homePage", userController.allServices);

module.exports = router;
