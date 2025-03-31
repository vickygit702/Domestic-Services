const express = require("express");
const router = express.Router();
const techController = require("../../controllers/Techician/techServices");
// const { uploadMiddleware, handleImageUpload } = require("./imageUpload");

router
  .get("/:id/dashboard", techController.techDashboard)
  .get("/:id/jobs", techController.fetchJobs)
  .get("/id/jobs/:jobId/details", techController.singleJobDetail);
//   .post("/:id/upload-profile-image", uploadMiddleware, handleImageUpload)

module.exports = router;
