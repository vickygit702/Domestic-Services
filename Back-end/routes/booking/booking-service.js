const express = require("express");
const bookServiceController = require("../../controllers/bookingController");

const router = express.Router();

router
  .post("/book-service", bookServiceController.bookService)
  .post(
    "/book-service-premium-user",
    bookServiceController.bookServicePremiumUser
  );

module.exports = router;
