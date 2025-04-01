const express = require("express");
const router = express.Router();
const techController = require("../../controllers/Techician/techServices");
const { uploadMiddleware, handleImageUpload } = require("./imageUpload");

router
  .get("/:id/dashboard", techController.techDashboard)
  .get("/:id/jobs", techController.fetchJobs)
  .put("/:id/update-tech-profile", techController.updateTech)
  .post("/:id/upload-tech-profile-image", uploadMiddleware, handleImageUpload)
  .get("/:id/jobs/:jobId/details", techController.singleJobDetail);

module.exports = router;
