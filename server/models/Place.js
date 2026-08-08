const mongoose = require("mongoose");

const essentialSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
        },

        checked: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

const placeSchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Beach",
                "Restaurant",
                "Shopping",
                "Adventure",
                "Historical",
            ],
        },

        description: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
        },

        estimatedCost: {
            type: Number,
            default: 0,
            min: 0,
        },

        actualCost: {
            type: Number,
            default: null,
            min: 0,
        },

        duration: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "planned",
                "unplanned",
                "visited",
            ],
            default: "unplanned",
        },

        day: {
            type: Number,
            default: null,
            min: 1,
        },

        time: {
            type: String,
            default: null,
        },

        endTime: {
            type: String,
            default: null,
        },

        favorite: {
            type: Boolean,
            default: false,
        },

        essentials: {
            type: [essentialSchema],
            default: [],
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Place", placeSchema);