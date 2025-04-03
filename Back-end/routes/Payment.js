const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/Payment");

router.post("/create-payment-intent", paymentController.createPayment);

module.exports = router;
