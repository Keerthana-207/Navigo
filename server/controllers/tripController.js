const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Place = require("../models/Place");


// ============================================
// CREATE TRIP
// POST /api/trips
// ============================================

function calculateSustainabilityScore(transport, accommodation, travelStyle) {
    let score = 20;
    if (transport === "train") score += 35;
    else if (transport === "car") score += 25;
    else if (transport === "flight") score += 12;

    if (accommodation === "homestay" || accommodation === "camping") score += 35;
    else if (accommodation === "hostel") score += 28;
    else if (accommodation === "hotel") score += 20;
    else if (accommodation === "resort") score += 10;

    if (travelStyle === "budget") score += 25;
    else if (travelStyle === "standard") score += 20;
    else if (travelStyle === "luxury") score += 12;

    return Math.min(100, Math.max(10, score));
}

function calculateReadinessScore(trip, placeCount = 0) {
    let score = 30; // base info
    if (trip.itineraryGenerated || placeCount > 0) score += 30;

    if (trip.packingList && trip.packingList.length > 0) {
        const checked = trip.packingList.filter((item) => item.checked).length;
        const packingRatio = checked / trip.packingList.length;
        score += Math.round(packingRatio * 25);
    }

    if (trip.budget) score += 15;

    return Math.min(100, score);
}

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
            startDate,
            endDate,
        } = req.body;

        const sustainabilityScore = calculateSustainabilityScore(transport, accommodation, travelStyle);

        const trip = await Trip.create({
            user: req.user._id,
            destination,
            travelers,
            duration,
            travelStyle,
            budget: budget === "" || budget === undefined ? null : Number(budget),
            transport,
            accommodation,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
            sustainabilityScore,
            travelReadinessScore: 50,
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

        const placeCount = await Place.countDocuments({ trip: id });
        trip.travelReadinessScore = calculateReadinessScore(trip, placeCount);
        await trip.save();

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
            "startDate",
            "endDate",
            "status",
            "packingList",
            "expenses",
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

        if (updates.transport || updates.accommodation || updates.travelStyle) {
            const currentTrip = await Trip.findById(id);
            const transport = updates.transport || currentTrip.transport;
            const accommodation = updates.accommodation || currentTrip.accommodation;
            const travelStyle = updates.travelStyle || currentTrip.travelStyle;
            updates.sustainabilityScore = calculateSustainabilityScore(transport, accommodation, travelStyle);
        }

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

        const placeCount = await Place.countDocuments({ trip: id });
        trip.travelReadinessScore = calculateReadinessScore(trip, placeCount);
        await trip.save();

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