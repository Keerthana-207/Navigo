const express = require("express");

const {
    createPlace,
    getTripPlaces,
    getPlaceById,
    updatePlace,
    deletePlace,
} = require("../controllers/placeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Add place to trip
router.post(
    "/trips/:tripId/places",
    authMiddleware,
    createPlace
);


// Get all places for trip
router.get(
    "/trips/:tripId/places",
    authMiddleware,
    getTripPlaces
);


// Get specific place
router.get(
    "/trips/:tripId/places/:placeId",
    authMiddleware,
    getPlaceById
);


// Update place
router.put(
    "/trips/:tripId/places/:placeId",
    authMiddleware,
    updatePlace
);


// Delete place
router.delete(
    "/trips/:tripId/places/:placeId",
    authMiddleware,
    deletePlace
);


module.exports = router;