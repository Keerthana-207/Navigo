const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Place = require("../models/Place");


// ============================================
// CREATE TRIP
// POST /api/trips
// ============================================

const createTrip = async (req, res) => {
    try {
        const {
            destination,
            travelers,
            duration,
            travelStyle,
            budget,
            transport,
            accommodation,
        } = req.body;

        const trip = await Trip.create({
            user: req.user._id,
            destination,
            travelers,
            duration,
            travelStyle,
            budget: budget === "" ? null : budget,
            transport,
            accommodation,
        });

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip,
        });

    } catch (error) {
        console.error("Create Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create trip",
        });
    }
};


// ============================================
// GET MY TRIPS
// GET /api/trips
// ============================================

const getMyTrips = async (req, res) => {
    try {
        const trips = await Trip.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: trips.length,
            trips,
        });

    } catch (error) {
        console.error("Get Trips Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch trips",
        });
    }
};


// ============================================
// GET SINGLE TRIP
// GET /api/trips/:id
// ============================================

const getTripById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID",
            });
        }

        const trip = await Trip.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        res.status(200).json({
            success: true,
            trip,
        });

    } catch (error) {
        console.error("Get Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch trip",
        });
    }
};


// ============================================
// UPDATE TRIP
// PUT /api/trips/:id
// ============================================

const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID",
            });
        }

        const allowedFields = [
            "destination",
            "travelers",
            "duration",
            "travelStyle",
            "budget",
            "transport",
            "accommodation",
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] =
                    req.body[field] === "" && field === "budget"
                        ? null
                        : req.body[field];
            }
        });

        const trip = await Trip.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id,
            },
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            trip,
        });

    } catch (error) {
        console.error("Update Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update trip",
        });
    }
};


// ============================================
// DELETE TRIP
// DELETE /api/trips/:id
// ============================================

const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID",
            });
        }

        const trip = await Trip.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        // Delete all itinerary places belonging to this trip
        await Place.deleteMany({
            trip: id,
        });

        res.status(200).json({
            success: true,
            message: "Trip and itinerary deleted successfully",
        });

    } catch (error) {
        console.error("Delete Trip Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete trip",
        });
    }
};


module.exports = {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
};