const Trip = require("../models/Trip");
const Place = require("../models/Place");
const {
    generateItinerary,
} = require("../services/itineraryAI");

const generateTripItinerary = async (req, res) => {

    try {

        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        // Prevent accidental duplicate generation
        const existingPlaces = await Place.countDocuments({
            trip: trip._id,
        });

        if (existingPlaces > 0) {
            return res.status(400).json({
                success: false,
                message: "Itinerary already exists for this trip",
            });
        }

        const aiResult = await generateItinerary(trip);

        if (
            !aiResult ||
            !Array.isArray(aiResult.places)
        ) {
            return res.status(500).json({
                success: false,
                message: "AI returned invalid itinerary data",
            });
        }

        const places = aiResult.places.map(
            (place, index) => ({
                ...place,
                trip: trip._id,
                order: index,
            })
        );

        const createdPlaces =
            await Place.insertMany(places);

        trip.itineraryGenerated = true;

        await trip.save();

        res.status(201).json({
            success: true,
            message: "Itinerary generated successfully",
            places: createdPlaces,
        });

    } catch (error) {

        console.error(
            "Generate Itinerary Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to generate itinerary",
        });
    }
};

const getTripPlaces = async (req, res) => {

    try {

        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const places = await Place.find({
            trip: trip._id,
        }).sort({
            day: 1,
            order: 1,
        });

        res.status(200).json({
            success: true,
            count: places.length,
            places,
        });

    } catch (error) {

        console.error(
            "Get Trip Places Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch itinerary places",
        });
    }
};

module.exports = {
    generateTripItinerary,
    getTripPlaces,
};
