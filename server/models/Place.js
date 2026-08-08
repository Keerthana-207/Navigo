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

        estCost: {
            type: Number,
            default: 0,
            min: 0,
        },

        actualCost: {
            type: Number,
            default: null,
            min: 0,
        },

        notes: {
            type: String,
            default: "",
            trim: true,
        },

        duration: {
            type: String,
            default: "",
            trim: true,
        },

        desc: {
            type: String,
            default: "",
            trim: true,
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
    },
    {
        timestamps: true,
    }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;