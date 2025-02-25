const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");

router
  .post("/signupUser", authController.signupUser)
  .post("/loginUser", authController.loginUser)

  .post("/signupTechnician", authController.signupTechnician)
  .post("/loginTechnician", authController.loginTechnician);

module.exports = router;
