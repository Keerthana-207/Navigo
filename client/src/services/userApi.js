const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

export async function getProfile() {
    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/auth/profile`,
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
            data?.message ||
                "Failed to fetch profile"
        );
    }

    return data;
}

export async function updateProfile(profileData) {
    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/auth/profile`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message ||
                "Failed to update profile"
        );
    }

    return data;
}