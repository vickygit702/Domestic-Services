const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");

router
  .post("/signupUser", authController.signupUser)
  .post("/loginUser", authController.loginUser)
  .post("/signupProvider", authController.signupProvider)
  .post("/loginProvider", authController.loginProvider);

module.exports = router;
