const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin/Admin");
router
  .put("/change-role", adminController.setPremiumUser)
  .post("/add-service", adminController.addServices)
  .put("/update/:id", adminController.updateService)
  .delete("/delete/:id", adminController.deleteService);

module.exports = router;
