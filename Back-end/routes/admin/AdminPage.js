const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/Admin");
router
  .put("/change-role", adminController.setPremiumUser)
  .post("/add-service", adminController.addServices)
  .post("/add-many-services", adminController.addManyServices)
  .put("/update/:id", adminController.updateService)
  .delete("/delete/:id", adminController.deleteService)
  .post("/create-payslip-document", adminController.generatePayslips)
  .get("/monthly-summary", adminController.getMonthlySummary)
  .post("/process-payments", adminController.processPayments);

module.exports = router;
