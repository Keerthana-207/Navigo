const express = require("express");

const {
    getTripBudget,
    addExpense,
    addBudgetCategory,
} = require("../controllers/budgetController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Get trip budget
router.get(
    "/:tripId/budget",
    authMiddleware,
    getTripBudget
);


// Add expense
router.post(
    "/:tripId/budget/expenses",
    authMiddleware,
    addExpense
);


// Add budget category
router.post(
    "/:tripId/budget/categories",
    authMiddleware,
    addBudgetCategory
);


module.exports = router;