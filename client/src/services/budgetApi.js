const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const getToken = () => {
    return localStorage.getItem("token");
};

const request = async (url, options = {}) => {
    const token = getToken();

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : {}),
            ...(options.headers || {}),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong"
        );
    }

    return data;
};

export const getTripBudget = (tripId) => {
    return request(
        `${API_URL}/trips/${tripId}/budget`
    );
};

export const addExpense = (
    tripId,
    expense
) => {
    return request(
        `${API_URL}/trips/${tripId}/budget/expenses`,
        {
            method: "POST",
            body: JSON.stringify(expense),
        }
    );
};

export const addBudgetCategory = (
    tripId,
    category
) => {
    return request(
        `${API_URL}/trips/${tripId}/budget/categories`,
        {
            method: "POST",
            body: JSON.stringify(category),
        }
    );
};