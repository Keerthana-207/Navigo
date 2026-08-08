const express = require("express");

const {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Create trip
router.post(
    "/",
    authMiddleware,
    createTrip
);


// Get all logged-in user's trips
router.get(
    "/",
    authMiddleware,
    getMyTrips
);


// Get single trip
router.get(
    "/:id",
    authMiddleware,
    getTripById
);


// Update trip
router.put(
    "/:id",
    authMiddleware,
    updateTrip
);


// Delete trip
router.delete(
    "/:id",
    authMiddleware,
    deleteTrip
);


module.exports = router;