const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || "7d"
        }
    );
};

const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            city,
            country
        } = req.body;

        // Validate required fields
        if (
            !fullName ||
            !email ||
            !password ||
            !city ||
            !country
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        // Normalize input
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedFullName = fullName.trim();
        const normalizedCity = city.trim();
        const normalizedCountry = country.trim();

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters."
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            fullName: normalizedFullName,
            email: normalizedEmail,
            password: hashedPassword,
            city: normalizedCity,
            country: normalizedCountry
        });

        // Generate token
        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                city: user.city,
                country: user.country
            }
        });

    } catch (error) {

        // MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        console.error("Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create account."
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const user = await User
            .findOne({ email: normalizedEmail })
            .select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                city: user.city,
                country: user.country
            }
        });

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to login."
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile."
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            fullName,
            email,
            city,
            country,
            phoneNumber,
            profileImage,
        } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Update only fields that were provided
        if (fullName !== undefined) {
            const trimmedName = fullName.trim();

            if (!trimmedName) {
                return res.status(400).json({
                    success: false,
                    message: "Full name cannot be empty.",
                });
            }

            user.fullName = trimmedName;
        }

        if (email !== undefined) {
            const normalizedEmail =
                email.trim().toLowerCase();

            if (!normalizedEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email cannot be empty.",
                });
            }

            // Check if another account already uses this email
            const existingUser = await User.findOne({
                email: normalizedEmail,
                _id: { $ne: userId },
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists.",
                });
            }

            user.email = normalizedEmail;
        }

        if (city !== undefined) {
            user.city = city.trim();
        }

        if (country !== undefined) {
            user.country = country.trim();
        }

        if (phoneNumber !== undefined) {
            user.phoneNumber = phoneNumber.trim();
        }

        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                city: updatedUser.city,
                country: updatedUser.country,
                phoneNumber: updatedUser.phoneNumber,
                profileImage: updatedUser.profileImage,
                createdAt: updatedUser.createdAt,
            },
        });
    } catch (error) {
        // MongoDB duplicate email
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile.",
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};

