const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes.js");
const tripRoutes = require("./routes/tripRoutes.js");
const placeRoutes = require("./routes/placeRoutes.js");
const itineraryRoutes = require("./routes/itineraryRoutes.js");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();

const app = express();


// ========================================
// Security
// ========================================

app.use(helmet());


// ========================================
// CORS
// ========================================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "https://navigo-frontend-livid.vercel.app",
        ],
         methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
         allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);


// ========================================
// Body Parser
// ========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ========================================
// Rate Limiting
// ========================================

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});


// ========================================
// Health Check
// ========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Navigo API is running.",
    });
});


// ========================================
// API Routes
// ========================================

app.use(
    "/api/auth",
    authLimiter,
    authRoutes
);

app.use(
    "/api/trips",
    tripRoutes
);

app.use(
    "/api/trips",
    budgetRoutes
)

app.use(
    "/api",
    placeRoutes
);

app.use(
    "/api",
    itineraryRoutes
);


// ========================================
// 404 Error
// ========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.originalUrl,
        method: req.method,
    });
});


// ========================================
// Global Error Handler
// ========================================

app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});


// ========================================
// Start Server
// ========================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server is running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "Failed to start server."
        );

        console.error(error.message);

        process.exit(1);
    }
};

startServer();