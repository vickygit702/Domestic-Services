const express = require("express");
const { bookService } = require("../../controllers/bookingController");

const router = express.Router();

router.post("/book-service", bookService);

module.exports = router;
