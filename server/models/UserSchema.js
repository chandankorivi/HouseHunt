
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        unique: true,
        sparse: true  // allows null/undefined without unique conflict for old docs
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "owner", "user"],
        required: true
    },
    grantStatus: {
        type: String,
        enum: ["pending", "granted"],
        default: "pending"
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpUsed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);