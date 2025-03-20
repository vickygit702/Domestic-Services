const express = require("express");
const router = express.Router();
const userController = require("../../controllers/User/userServices");

router
  .put("/:id/update-profile", userController.updateUser)
  .get("/:id/status-page/myBookings", userController.myBookings)
  .get("/:id/services/fetchAllServices", userController.allServices);

module.exports = router;
