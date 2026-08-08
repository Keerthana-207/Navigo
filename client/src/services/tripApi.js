const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    const token = getToken();

    return {
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`,
        }),
    };
}

export async function createTrip(tripData) {
    const response = await fetch(`${API_URL}/trips`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(tripData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create trip"
        );
    }

    return data;
}

export async function getMyTrips() {
    const response = await fetch(`${API_URL}/trips`, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch trips"
        );
    }

    return data;
}

export async function getTripById(tripId) {
    const response = await fetch(
        `${API_URL}/trips/${tripId}`,
        {
            method: "GET",
            headers: getHeaders(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch trip"
        );
    }

    return data;
}

export async function updateTrip(tripId, tripData) {
    const response = await fetch(
        `${API_URL}/trips/${tripId}`,
        {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(tripData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update trip"
        );
    }

    return data;
}

export async function deleteTrip(tripId) {
    const response = await fetch(
        `${API_URL}/trips/${tripId}`,
        {
            method: "DELETE",
            headers: getHeaders(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete trip"
        );
    }

    return data;
}

export const getTripPlaces = async (tripId) => {

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/trips/${tripId}/places`,
        {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch itinerary"
        );
    }

    return data;
};

export const generateTripItinerary = async (tripId) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/generate-itinerary`, {
        method: "POST",
        headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to generate itinerary");
    }
    return data;
};

export const createPlace = async (tripId, placeData) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/places`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(placeData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create place");
    }
    return data;
};

export const updatePlace = async (tripId, placeId, placeData) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/places/${placeId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(placeData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update place");
    }
    return data;
};

export const deletePlace = async (tripId, placeId) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/places/${placeId}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to delete place");
    }
    return data;
};