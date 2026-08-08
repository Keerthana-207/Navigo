const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [3, "Full name must be at least 3 characters"],
            maxlength: [50, "Full name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false
        },

        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },

        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true
        },

        profileImage: {
            type: String,
            default: ""
        },

        phoneNumber: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            maxlength: [250, "Bio cannot exceed 250 characters"],
            default: ""
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        lastLogin: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

// Remove password when converting to JSON
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User