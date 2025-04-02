const express = require("express");
const router = express.Router();
const userController = require("../../controllers/User/userServices");
const { uploadMiddleware, handleImageUpload } = require("./imageUpload");

router
  .put("/:id/update-user-profile", userController.updateUser)
  .post("/:id/upload-user-profile-image", uploadMiddleware, handleImageUpload)
  .get("/:id/status-page/myBookings", userController.myBookings)
  .put("/:id/status-page/cancel", userController.cancelBooking)
  // .post("/:id/myBookings/makePayment", userController.makePayment)
  .get("/:id/services/fetchAllServices", userController.allServices);

module.exports = router;
