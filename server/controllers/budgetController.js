const Trip = require("../models/Trip");

const getTripBudget = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user.id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found.",
            });
        }

        return res.status(200).json({
            success: true,
            budget: trip.budget ?? 0,
            budgetDetails: trip.budgetDetails || {
                categories: [],
                expenses: [],
            },
        });
    } catch (error) {
        console.error("Get Trip Budget Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch trip budget.",
        });
    }
};


const addBudgetCategory = async (req, res) => {
    try {
        const { tripId } = req.params;

        const {
            id,
            name,
            icon,
            allocated,
            color,
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required.",
            });
        }

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user.id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found.",
            });
        }

        if (!trip.budgetDetails) {
            trip.budgetDetails = {
                categories: [],
                expenses: [],
            };
        }

        if (!trip.budgetDetails.categories) {
            trip.budgetDetails.categories = [];
        }

        const categoryId =
            id ||
            `${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`;

        const category = {
            id: categoryId,
            name: name.trim(),
            icon: icon || "Tag",
            allocated: Number(allocated) || 0,
            spent: 0,
            color: color || "#3b82f6",
        };

        trip.budgetDetails.categories.push(category);

        await trip.save();

        return res.status(201).json({
            success: true,
            message: "Budget category added successfully.",
            category,
            budgetDetails: trip.budgetDetails,
        });
    } catch (error) {
        console.error(
            "Add Budget Category Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to add budget category.",
        });
    }
};


const addExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, note, amount } = req.body;

        if (!category || amount === undefined) {
            return res.status(400).json({
                success: false,
                message: "Category and amount are required.",
            });
        }

        const expenseAmount = Number(amount);

        if (
            Number.isNaN(expenseAmount) ||
            expenseAmount < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense amount.",
            });
        }

        const trip = await Trip.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found.",
            });
        }

        // Make sure budgetDetails exists
        if (!trip.budgetDetails) {
            trip.budgetDetails = {
                categories: [],
                expenses: [],
            };
        }

        if (!trip.budgetDetails.expenses) {
            trip.budgetDetails.expenses = [];
        }

        if (!trip.budgetDetails.categories) {
            trip.budgetDetails.categories = [];
        }

        // Add expense to budgetDetails.expenses
        trip.budgetDetails.expenses.push({
            category: category.trim(),
            note: note?.trim() || "",
            amount: expenseAmount,
            createdAt: new Date(),
        });

        // Find matching budget category
        const budgetCategory =
            trip.budgetDetails.categories.find(
                (item) =>
                    item.name.trim().toLowerCase() ===
                    category.trim().toLowerCase()
            );

        // Update category spent amount
        if (budgetCategory) {
            budgetCategory.spent =
                Number(budgetCategory.spent || 0) +
                expenseAmount;
        }

        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Expense added successfully.",
            budgetDetails: trip.budgetDetails,
        });
    } catch (error) {
        console.error("Add expense error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add expense.",
        });
    }
};

module.exports = {
    getTripBudget,
    addBudgetCategory,
    addExpense,
    
};