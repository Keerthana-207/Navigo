const express = require("express");

const router = express.Router();

const {
    generateTripItinerary,
    getTripPlaces,
} = require("../controllers/itineraryController");

const authMiddleware = require("../middleware/authMiddleware");


// Generate itinerary
router.post(
    "/trips/:id/generate-itinerary",
    authMiddleware,
    generateTripItinerary
);


// Get itinerary places
router.get(
    "/trips/:id/places",
    authMiddleware,
    getTripPlaces
);


module.exports = router;