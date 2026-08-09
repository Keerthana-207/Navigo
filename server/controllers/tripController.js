const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const Place = require("../models/Place");

// ============================================
// CALCULATE SUSTAINABILITY SCORE
// ============================================

function calculateSustainabilityScore(
    transport,
    accommodation,
    travelStyle
) {
    let score = 20;

    if (transport === "train") {
        score += 35;
    } else if (transport === "car") {
        score += 25;
    } else if (transport === "flight") {
        score += 12;
    }

    if (
        accommodation === "homestay" ||
        accommodation === "camping"
    ) {
        score += 35;
    } else if (accommodation === "hostel") {
        score += 28;
    } else if (accommodation === "hotel") {
        score += 20;
    } else if (accommodation === "resort") {
        score += 10;
    }

    if (travelStyle === "budget") {
        score += 25;
    } else if (travelStyle === "standard") {
        score += 20;
    } else if (travelStyle === "luxury") {
        score += 12;
    }

    return Math.min(100, Math.max(10, score));
}

// ============================================
// CALCULATE TRAVEL READINESS SCORE
// ============================================

function calculateReadinessScore(trip, placeCount = 0) {
    let score = 30;

    if (trip.itineraryGenerated || placeCount > 0) {
        score += 30;
    }

    if (
        trip.packingList &&
        trip.packingList.length > 0
    ) {
        const checked = trip.packingList.filter(
            (item) => item.checked
        ).length;

        const packingRatio =
            checked / trip.packingList.length;

        score += Math.round(packingRatio * 25);
    }

    if (trip.budget) {
        score += 15;
    }

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

        const totalBudget = Number(budget);

        const sustainabilityScore =
            calculateSustainabilityScore(
                transport,
                accommodation,
                travelStyle
            );

        const budgetDetails = {
            categories: [
                {
                    id: "accommodation",
                    name: "Accommodation",
                    icon: "Bed",
                    allocated: Math.round(
                        totalBudget * 0.4
                    ),
                    spent: 0,
                    color: "#f97316",
                },
                {
                    id: "food",
                    name: "Food & Dining",
                    icon: "Food",
                    allocated: Math.round(
                        totalBudget * 0.3
                    ),
                    spent: 0,
                    color: "#3b82f6",
                },
                {
                    id: "transport",
                    name: "Transport",
                    icon: "Plane",
                    allocated: Math.round(
                        totalBudget * 0.15
                    ),
                    spent: 0,
                    color: "#10b981",
                },
                {
                    id: "activities",
                    name: "Activities",
                    icon: "Activity",
                    allocated: Math.round(
                        totalBudget * 0.15
                    ),
                    spent: 0,
                    color: "#a855f7",
                },
            ],

            expenses: [],
        };

        // IMPORTANT:
        // Create the trip BEFORE sending the response.
        const trip = await Trip.create({
            user: req.user._id,

            destination,
            travelers,
            duration,
            travelStyle,

            budget: totalBudget,

            transport,
            accommodation,

            startDate: startDate || null,
            endDate: endDate || null,

            sustainabilityScore,

            budgetDetails,
        });

        return res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip,
        });

    } catch (error) {
        console.error(
            "Create Trip Error:",
            error
        );

        return res.status(500).json({
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

        return res.status(200).json({
            success: true,
            count: trips.length,
            trips,
        });

    } catch (error) {
        console.error(
            "Get Trips Error:",
            error
        );

        return res.status(500).json({
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

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
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

        const placeCount =
            await Place.countDocuments({
                trip: id,
            });

        trip.travelReadinessScore =
            calculateReadinessScore(
                trip,
                placeCount
            );

        await trip.save();

        return res.status(200).json({
            success: true,
            trip,
        });

    } catch (error) {
        console.error(
            "Get Trip Error:",
            error
        );

        return res.status(500).json({
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

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
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
            if (
                req.body[field] !== undefined
            ) {
                updates[field] =
                    req.body[field] === "" &&
                    field === "budget"
                        ? null
                        : req.body[field];
            }
        });

        if (
            updates.transport ||
            updates.accommodation ||
            updates.travelStyle
        ) {
            const currentTrip =
                await Trip.findOne({
                    _id: id,
                    user: req.user._id,
                });

            if (!currentTrip) {
                return res.status(404).json({
                    success: false,
                    message: "Trip not found",
                });
            }

            const transport =
                updates.transport ||
                currentTrip.transport;

            const accommodation =
                updates.accommodation ||
                currentTrip.accommodation;

            const travelStyle =
                updates.travelStyle ||
                currentTrip.travelStyle;

            updates.sustainabilityScore =
                calculateSustainabilityScore(
                    transport,
                    accommodation,
                    travelStyle
                );
        }

        const trip =
            await Trip.findOneAndUpdate(
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

        const placeCount =
            await Place.countDocuments({
                trip: id,
            });

        trip.travelReadinessScore =
            calculateReadinessScore(
                trip,
                placeCount
            );

        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            trip,
        });

    } catch (error) {
        console.error(
            "Update Trip Error:",
            error
        );

        return res.status(500).json({
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

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid trip ID",
            });
        }

        const trip =
            await Trip.findOneAndDelete({
                _id: id,
                user: req.user._id,
            });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        await Place.deleteMany({
            trip: id,
        });

        return res.status(200).json({
            success: true,
            message:
                "Trip and itinerary deleted successfully",
        });

    } catch (error) {
        console.error(
            "Delete Trip Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete trip",
        });
    }
};

// ============================================
// GET TRIP BUDGET
// GET /api/trips/:id/budget
// ============================================

const getTripBudget = async (req, res) => {
    try {
        // IMPORTANT:
        // tripRoutes.js uses /:id/budget
        const { id } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
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

        return res.status(200).json({
            success: true,
            budget: trip.budget ?? 0,
            budgetDetails:
                trip.budgetDetails || {
                    categories: [],
                    expenses: [],
                },
        });

    } catch (error) {
        console.error(
            "Get budget error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to load budget",
        });
    }
};

// ============================================
// ADD EXPENSE
// POST /api/trips/:id/budget/expenses
// ============================================

const addExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category,
            note,
            amount,
        } = req.body;

        if (!category) {
            return res.status(400).json({
                success: false,
                message:
                    "Category is required",
            });
        }

        const expenseAmount = Number(amount);

        if (
            Number.isNaN(expenseAmount) ||
            expenseAmount <= 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "A valid expense amount is required",
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
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

        // Make sure budgetDetails exists
        if (!trip.budgetDetails) {
            trip.budgetDetails = {
                categories: [],
                expenses: [],
            };
        }

        if (
            !trip.budgetDetails.categories
        ) {
            trip.budgetDetails.categories = [];
        }

        if (
            !trip.budgetDetails.expenses
        ) {
            trip.budgetDetails.expenses = [];
        }

        // Find category by ID OR name
        const budgetCategory =
            trip.budgetDetails.categories.find(
                (cat) =>
                    cat.id === category ||
                    cat.name
                        .trim()
                        .toLowerCase() ===
                        category
                            .trim()
                            .toLowerCase()
            );

        if (!budgetCategory) {
            return res.status(404).json({
                success: false,
                message:
                    "Budget category not found",
            });
        }

        // Update category spent amount
        budgetCategory.spent =
            Number(
                budgetCategory.spent || 0
            ) + expenseAmount;

        // Add expense
        trip.budgetDetails.expenses.unshift({
            category:
                budgetCategory.id,
            note:
                note?.trim() || "",
            amount: expenseAmount,
            createdAt: new Date(),
        });

        await trip.save();

        return res.status(200).json({
            success: true,
            message:
                "Expense added successfully",
            budgetDetails:
                trip.budgetDetails,
        });

    } catch (error) {
        console.error(
            "Add expense error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to add expense",
        });
    }
};

// ============================================
// ADD BUDGET CATEGORY
// POST /api/trips/:id/budget/categories
// ============================================

const addBudgetCategory = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const {
            name,
            allocated,
            icon = "Tag",
            color = "#3b82f6",
        } = req.body;

        if (
            !name ||
            !name.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Category name is required",
            });
        }

        const allocatedAmount =
            Number(allocated);

        if (
            Number.isNaN(
                allocatedAmount
            ) ||
            allocatedAmount <= 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "A valid allocation amount is required",
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
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

        if (!trip.budgetDetails) {
            trip.budgetDetails = {
                categories: [],
                expenses: [],
            };
        }

        if (
            !trip.budgetDetails.categories
        ) {
            trip.budgetDetails.categories = [];
        }

        const categoryId =
            `${name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")}-${Date.now()}`;

        trip.budgetDetails.categories.push(
            {
                id: categoryId,
                name: name.trim(),
                icon,
                allocated:
                    allocatedAmount,
                spent: 0,
                color,
            }
        );

        await trip.save();

        return res.status(201).json({
            success: true,
            message:
                "Category added successfully",
            budgetDetails:
                trip.budgetDetails,
        });

    } catch (error) {
        console.error(
            "Add category error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to add category",
        });
    }
};

// ============================================
// EXPORTS
// ============================================

module.exports = {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    getTripBudget,
    addExpense,
    addBudgetCategory,
};