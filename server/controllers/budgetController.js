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
        const { tripId } = req.params;

        const {
            category,
            note,
            amount,
        } = req.body;

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Expense category is required.",
            });
        }

        if (
            amount === undefined ||
            amount === null ||
            Number(amount) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid expense amount is required.",
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

        if (!trip.budgetDetails.expenses) {
            trip.budgetDetails.expenses = [];
        }

        const expense = {
            category: category.trim(),
            note: note?.trim() || "",
            amount: Number(amount),
            createdAt: new Date(),
        };

        trip.budgetDetails.expenses.push(expense);

        /*
         * Update the spent amount of the matching
         * budget category.
         */
        const matchingCategory =
            trip.budgetDetails.categories.find(
                (item) =>
                    item.name.toLowerCase() ===
                    category.trim().toLowerCase()
            );

        if (matchingCategory) {
            matchingCategory.spent =
                Number(matchingCategory.spent || 0) +
                Number(amount);
        }

        await trip.save();

        return res.status(201).json({
            success: true,
            message: "Expense added successfully.",
            expense,
            budgetDetails: trip.budgetDetails,
        });
    } catch (error) {
        console.error(
            "Add Expense Error:",
            error
        );

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