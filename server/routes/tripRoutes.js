const express = require("express");

const {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    getTripBudget,
    addExpense,
    addBudgetCategory,
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================
// TRIP ROUTES
// ============================================

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

// ============================================
// BUDGET ROUTES
// ============================================

// Get trip budget
router.get(
    "/:id/budget",
    authMiddleware,
    getTripBudget
);

// Add budget expense
router.post(
    "/:id/budget/expenses",
    authMiddleware,
    addExpense
);

// Add budget category
router.post(
    "/:id/budget/categories",
    authMiddleware,
    addBudgetCategory
);

module.exports = router;
