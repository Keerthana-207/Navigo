const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();

const app = express();


// ========================================
// Middleware
// ========================================

app.use(helmet());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ========================================
// Rate Limiting
// ========================================

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});


// ========================================
// Routes
// ========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Navigo API is running.",
    });
});

app.use("/api/auth", authLimiter, authRoutes);


// ========================================
// 404 Error
// ========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
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
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server.");
        console.error(error.message);

        process.exit(1);
    }
};

startServer();