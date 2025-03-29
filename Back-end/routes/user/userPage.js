const express = require("express");
const router = express.Router();
const userController = require("../../controllers/User/userServices");
const { uploadMiddleware, handleImageUpload } = require("./imageUpload");

router
  .put("/:id/update-profile", userController.updateUser)
  .post("/:id/upload-profile-image", uploadMiddleware, handleImageUpload)
  .get("/:id/status-page/myBookings", userController.myBookings)
  .get("/:id/services/fetchAllServices", userController.allServices);

module.exports = router;
