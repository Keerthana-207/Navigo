const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateItinerary(trip) {

    const prompt = `
You are a professional travel itinerary planner.

Create a realistic itinerary based on the following trip:

Destination: ${trip.destination}
Duration: ${trip.duration} days
Travelers: ${trip.travelers}
Travel style: ${trip.travelStyle}
Budget: ${trip.budget || "Not specified"}
Transport: ${trip.transport}
Accommodation: ${trip.accommodation}

Generate places that are actually relevant to the destination.

Rules:

1. Create a balanced itinerary.
2. Do not schedule too many activities in one day.
3. Respect the trip duration.
4. Consider the travel style.
5. Consider the budget.
6. Group nearby places when possible.
7. Include restaurants, attractions and activities where appropriate.
8. Include realistic estimated costs.
9. Include morning, afternoon and evening activities.
10. Do not invent obviously fake attractions.
11. Return ONLY valid JSON.

The JSON must follow this structure:

{
    "places": [
        {
            "name": "string",
            "category": "Beach | Restaurant | Shopping | Adventure | Historical",
            "description": "string",
            "notes": "string",
            "estimatedCost": 0,
            "duration": "string",
            "status": "planned",
            "day": 1,
            "time": "09:00 AM",
            "endTime": "11:00 AM",
            "favorite": false,
            "essentials": [
                {
                    "label": "string",
                    "checked": false
                }
            ]
        }
    ]
}
`;

    const response = await client.responses.create({
        model: "gpt-5",
        input: prompt,
    });

    return JSON.parse(response.output_text);
}

module.exports = {
    generateItinerary,
};