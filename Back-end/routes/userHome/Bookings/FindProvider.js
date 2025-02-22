const express = require("express");
const router = express.Router();
const bookingController = require("../../../controllers/BookProvider");

router.post("/fetch-providers", bookingController.fetchproviders);

module.exports = router;
