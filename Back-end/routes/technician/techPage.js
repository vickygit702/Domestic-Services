const express = require("express");
const router = express.Router();
const techController = require("../../controllers/Techician/techServices");
const { uploadMiddleware, handleImageUpload } = require("./imageUpload");

// Route to fetch all technicians
router.get("/", techController.getAllTechnicians);

// Routes for specific technician actions
router
  .get("/:id/dashboard", techController.techDashboard)
  .get("/:id/jobs/fetch-jobs", techController.fetchJobs)
  .get("/:id/payments/payslips", techController.getPayslips)
  .put("/:id/update-tech-profile", techController.updateTech)
  .put("/:id/jobs/update-job-status", techController.updateJobStatus)
  .post("/:id/upload-tech-profile-image", uploadMiddleware, handleImageUpload)
  .get("/:id/jobs/:jobId/details", techController.singleJobDetail);

module.exports = router;