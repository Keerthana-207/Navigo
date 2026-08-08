const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        destination: {
            type: String,
            required: true,
            trim: true,
        },

        travelers: {
            type: Number,
            required: true,
            min: 1,
            max: 20,
        },

        duration: {
            type: Number,
            required: true,
            min: 1,
        },

        travelStyle: {
            type: String,
            required: true,
            enum: [
                "budget",
                "standard",
                "luxury",
            ],
        },

        budget: {
            type: Number,
            default: null,
            min: 0,
        },

        transport: {
            type: String,
            required: true,
            enum: [
                "flight",
                "train",
                "car",
            ],
        },

        accommodation: {
            type: String,
            required: true,
            enum: [
                "hotel",
                "hostel",
                "resort",
                "homestay",
                "camping"
            ],
        },

        startDate: {
            type: Date,
            default: null,
        },

        endDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["upcoming", "active", "completed"],
            default: "upcoming",
        },

        sustainabilityScore: {
            type: Number,
            default: 75,
            min: 0,
            max: 100,
        },

        travelReadinessScore: {
            type: Number,
            default: 60,
            min: 0,
            max: 100,
        },

        packingList: [
            {
                id: String,
                category: String,
                name: String,
                checked: { type: Boolean, default: false }
            }
        ],

        expenses: [
            {
                id: String,
                title: String,
                amount: Number,
                category: String,
                date: String
            }
        ],

        itineraryGenerated: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;