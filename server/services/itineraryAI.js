function generateFallbackItinerary(trip) {
    const dest = trip.destination || "Destination";
    const duration = Math.max(1, Number(trip.duration) || 3);
    const places = [];

    const templates = {
        goa: [
            { name: "Baga Beach Sunrise Walk & Water Sports", category: "Beach", description: "Start your morning with scenic views, beach walk, and optional parasailing.", notes: "Carry sunscreen and extra towels.", estimatedCost: 1500, time: "09:00 AM", endTime: "12:00 PM" },
            { name: "Brittos Shack Seafood Lunch", category: "Restaurant", description: "Famous beachfront dining with fresh seafood and Goan spices.", notes: "Try the Goan Fish Curry.", estimatedCost: 1200, time: "01:00 PM", endTime: "02:30 PM" },
            { name: "Aguada Fort Historical Tour", category: "Historical", description: "17th-century Portuguese fort and lighthouse overlooking the Arabian Sea.", notes: "Great spot for sunset photos.", estimatedCost: 300, time: "04:00 PM", endTime: "06:30 PM" },
            { name: "Anjuna Flea Market Shopping", category: "Shopping", description: "Vibrant market featuring handicrafts, bohemian clothing, and souvenirs.", notes: "Bargaining is recommended.", estimatedCost: 2000, time: "10:00 AM", endTime: "01:00 PM" },
            { name: "Dudhsagar Waterfall Trek", category: "Adventure", description: "Thrilling jeep safari and trek to India's tallest four-tiered waterfall.", notes: "Wear waterproof shoes.", estimatedCost: 2500, time: "08:00 AM", endTime: "03:00 PM" }
        ],
        paris: [
            { name: "Eiffel Tower Summit & Champ de Mars", category: "Historical", description: "Ascend the iconic Eiffel Tower for panoramic views of Paris.", notes: "Book tickets online to skip long queues.", estimatedCost: 3500, time: "09:30 AM", endTime: "12:30 PM" },
            { name: "Le Marais Cafe & Bistro Lunch", category: "Restaurant", description: "Authentic French croissants, quiche, and espresso in historic Marais.", notes: "Try the fresh macarons.", estimatedCost: 2200, time: "01:00 PM", endTime: "02:30 PM" },
            { name: "Louvre Museum Art Walk", category: "Historical", description: "Explore the Mona Lisa, Venus de Milo, and world-famous masterworks.", notes: "Wear comfortable walking shoes.", estimatedCost: 2800, time: "03:00 PM", endTime: "06:30 PM" },
            { name: "Champs-Élysées Luxury Shopping", category: "Shopping", description: "Stroll along the world's grandest avenue with top boutiques.", notes: "Visit Arc de Triomphe nearby.", estimatedCost: 5000, time: "11:00 AM", endTime: "02:00 PM" },
            { name: "Seine River Cruise Adventure", category: "Adventure", description: "Scenic boat cruise past Notre Dame, Musée d'Orsay, and historic bridges.", notes: "Sunset cruise recommended.", estimatedCost: 2000, time: "05:00 PM", endTime: "07:00 PM" }
        ],
        default: [
            { name: `${dest} Main Cultural Center & Landmark`, category: "Historical", description: `Explore the rich history and heritage of ${dest}.`, notes: "Check opening hours in advance.", estimatedCost: 1000, time: "09:30 AM", endTime: "12:00 PM" },
            { name: `Local Culinary Experience in ${dest}`, category: "Restaurant", description: `Savor popular local dishes and authentic cuisine in ${dest}.`, notes: "Ask for regional specialties.", estimatedCost: 1200, time: "12:30 PM", endTime: "02:00 PM" },
            { name: `${dest} City Park & Promenade Walk`, category: "Beach", description: "Relaxing afternoon walk through scenic parks, riverfront, or promenade.", notes: "Great spot for photography.", estimatedCost: 400, time: "02:30 PM", endTime: "04:30 PM" },
            { name: `${dest} Central Market & Artisan Shops`, category: "Shopping", description: "Discover local crafts, apparel, spices, and unique souvenirs.", notes: "Support local vendors.", estimatedCost: 1800, time: "05:00 PM", endTime: "07:00 PM" },
            { name: `${dest} Outdoor Adventure & Viewpoint Trek`, category: "Adventure", description: "Experience panoramic views of the city skyline and surrounding nature.", notes: "Carry water and sunscreen.", estimatedCost: 1500, time: "08:30 AM", endTime: "11:30 AM" }
        ]
    };

    const key = dest.toLowerCase().includes("goa") ? "goa" : dest.toLowerCase().includes("paris") ? "paris" : "default";
    const itemsPool = templates[key];

    for (let day = 1; day <= duration; day++) {
        const dayItemsCount = Math.min(3, itemsPool.length);
        for (let i = 0; i < dayItemsCount; i++) {
            const template = itemsPool[( (day - 1) * 2 + i ) % itemsPool.length];
            places.push({
                name: `Day ${day}: ${template.name}`,
                category: template.category,
                description: template.description,
                notes: template.notes,
                estimatedCost: template.estimatedCost,
                duration: template.endTime ? `${template.time} - ${template.endTime}` : "2 hours",
                status: "planned",
                day: day,
                time: template.time,
                endTime: template.endTime,
                favorite: i === 0,
                essentials: [
                    { label: "Water Bottle", checked: true },
                    { label: "Identity Proof / Ticket", checked: false },
                    { label: "Camera / Mobile", checked: true }
                ]
            });
        }
    }

    return { places };
}

async function generateItinerary(trip) {
    if (process.env.OPENAI_API_KEY) {
        try {
            const OpenAI = require("openai");
            const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
Return ONLY valid JSON matching structure:
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
            "essentials": [{ "label": "string", "checked": false }]
        }
    ]
}
`;

            const response = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" }
            });

            return JSON.parse(response.choices[0].message.content);
        } catch (err) {
            console.warn("OpenAI Itinerary API error, using smart fallback generator:", err.message);
            return generateFallbackItinerary(trip);
        }
    }

    return generateFallbackItinerary(trip);
}

module.exports = {
    generateItinerary,
};