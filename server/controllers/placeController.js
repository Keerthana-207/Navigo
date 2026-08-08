const mongoose = require("mongoose");
const Place = require("../models/Place");
const Trip = require("../models/Trip");


// ============================================
// CREATE PLACE
// POST /api/trips/:tripId/places
// ============================================

const createPlace = async (req, res) => {
    try {
        const { tripId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(tripId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID",
            });
        }

        // Make sure the trip belongs to logged-in user
        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const {
            name,
            category,
            estCost,
            actualCost,
            notes,
            duration,
            desc,
            status,
            day,
            time,
            endTime,
            favorite,
            essentials,
        } = req.body;

        const place = await Place.create({
            trip: tripId,
            name,
            category,
            estCost,
            actualCost,
            notes,
            duration,
            desc,
            status,
            day,
            time,
            endTime,
            favorite,
            essentials,
        });

        res.status(201).json({
            success: true,
            message: "Place added successfully",
            place,
        });

    } catch (error) {
        console.error("Create Place Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add place",
        });
    }
};


// ============================================
// GET PLACES FOR TRIP
// GET /api/trips/:tripId/places
// ============================================

const getTripPlaces = async (req, res) => {
    try {
        const { tripId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(tripId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID",
            });
        }

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const places = await Place.find({
            trip: tripId,
        }).sort({
            day: 1,
            createdAt: 1,
        });

        res.status(200).json({
            success: true,
            count: places.length,
            places,
        });

    } catch (error) {
        console.error("Get Places Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch places",
        });
    }
};


// ============================================
// GET SINGLE PLACE
// GET /api/trips/:tripId/places/:placeId
// ============================================

const getPlaceById = async (req, res) => {
    try {
        const {
            tripId,
            placeId,
        } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(tripId) ||
            !mongoose.Types.ObjectId.isValid(placeId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const place = await Place.findOne({
            _id: placeId,
            trip: tripId,
        });

        if (!place) {
            return res.status(404).json({
                success: false,
                message: "Place not found",
            });
        }

        res.status(200).json({
            success: true,
            place,
        });

    } catch (error) {
        console.error("Get Place Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch place",
        });
    }
};


// ============================================
// UPDATE PLACE
// PUT /api/trips/:tripId/places/:placeId
// ============================================

const updatePlace = async (req, res) => {
    try {
        const {
            tripId,
            placeId,
        } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(tripId) ||
            !mongoose.Types.ObjectId.isValid(placeId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const allowedFields = [
            "name",
            "category",
            "estCost",
            "actualCost",
            "notes",
            "duration",
            "desc",
            "status",
            "day",
            "time",
            "endTime",
            "favorite",
            "essentials",
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const place = await Place.findOneAndUpdate(
            {
                _id: placeId,
                trip: tripId,
            },
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!place) {
            return res.status(404).json({
                success: false,
                message: "Place not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Place updated successfully",
            place,
        });

    } catch (error) {
        console.error("Update Place Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update place",
        });
    }
};


// ============================================
// DELETE PLACE
// DELETE /api/trips/:tripId/places/:placeId
// ============================================

const deletePlace = async (req, res) => {
    try {
        const {
            tripId,
            placeId,
        } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(tripId) ||
            !mongoose.Types.ObjectId.isValid(placeId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const place = await Place.findOneAndDelete({
            _id: placeId,
            trip: tripId,
        });

        if (!place) {
            return res.status(404).json({
                success: false,
                message: "Place not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Place deleted successfully",
        });

    } catch (error) {
        console.error("Delete Place Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete place",
        });
    }
};


module.exports = {
    createPlace,
    getTripPlaces,
    getPlaceById,
    updatePlace,
    deletePlace,
};