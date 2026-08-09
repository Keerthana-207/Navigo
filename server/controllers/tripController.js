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

        const totalBudget = Number(req.body.budget);

        const budgetDetails = {
            categories: [
                {
                    id: "accommodation",
                    name: "Accommodation",
                    icon: "Bed",
                    allocated: Math.round(totalBudget * 0.4),
                    spent: 0,
                    color: "#f97316",
                },
                {
                    id: "food",
                    name: "Food & Dining",
                    icon: "Food",
                    allocated: Math.round(totalBudget * 0.3),
                    spent: 0,
                    color: "#3b82f6",
                },
                {
                    id: "transport",
                    name: "Transport",
                    icon: "Plane",
                    allocated: Math.round(totalBudget * 0.15),
                    spent: 0,
                    color: "#10b981",
                },
                {
                    id: "activities",
                    name: "Activities",
                    icon: "Activity",
                    allocated: Math.round(totalBudget * 0.15),
                    spent: 0,
                    color: "#a855f7",
                },
            ],

            expenses: [],
        };
        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip:{
                ...trip,
                budgetDetails
            }
        });

        const trip = await Trip.create({
            user: req.user._id,
            destination: req.body.destination,
            duration: req.body.duration,
            travelers: req.body.travelers,
            travelStyle: req.body.travelStyle,
            budget: totalBudget,
            budgetDetails,
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

const getTripBudget = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        return res.status(200).json({
            success: true,
            budget: trip.budget,
            budgetDetails: trip.budgetDetails,
        });
    } catch (error) {
        console.error("Get budget error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load budget",
        });
    }
};

const addExpense = async (req, res) => {
    try {
        const { category, note, amount } = req.body;

        if (!category || !amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Category and valid amount are required",
            });
        }

        const trip = await Trip.findOne({
            _id: req.params.tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const categoryIndex =
            trip.budgetDetails.categories.findIndex(
                (cat) => cat.id === category
            );

        if (categoryIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Budget category not found",
            });
        }

        trip.budgetDetails.categories[categoryIndex].spent += Number(
            amount
        );

        trip.budgetDetails.expenses.unshift({
            category,
            note: note || "",
            amount: Number(amount),
            createdAt: new Date(),
        });

        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Expense added successfully",
            budgetDetails: trip.budgetDetails,
        });
    } catch (error) {
        console.error("Add expense error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add expense",
        });
    }
};

const addBudgetCategory = async (req, res) => {
    try {
        const {
            name,
            allocated,
            icon = "Tag",
            color = "#3b82f6",
        } = req.body;

        if (!name || !allocated || Number(allocated) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Category name and allocation are required",
            });
        }

        const trip = await Trip.findOne({
            _id: req.params.tripId,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const id =
            name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-") +
            "-" +
            Date.now();

        trip.budgetDetails.categories.push({
            id,
            name: name.trim(),
            icon,
            allocated: Number(allocated),
            spent: 0,
            color,
        });

        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Category added successfully",
            budgetDetails: trip.budgetDetails,
        });
    } catch (error) {
        console.error("Add category error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add category",
        });
    }
};

module.exports = {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    addBudgetCategory,
    addExpense,
    getTripBudget
};