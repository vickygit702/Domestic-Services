const express = require("express");
const router = express.Router();
const mapController = require("../controllers/MapProvider");

router.get("/fetch-providers", mapController.fetchprovider);

module.exports = router;
