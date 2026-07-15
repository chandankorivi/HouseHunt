
const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// ─── GET ALL USERS ────────────────────────────────────────────────────────────
const getAllUsers = async (req, res) => {
    try {
        const users_info = await User.find().select('-password -otp -otpExpiry -otpUsed');
        res.status(200).json({ users_info });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// ─── GET ALL PROPERTIES ───────────────────────────────────────────────────────
const getAllProperties = async (req, res) => {
    try {
        const properties_info = await Property.find().populate("owner", "name email mobile");
        res.status(200).json({ properties_info });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch properties" });
    }
};

// ─── GET ALL BOOKINGS ─────────────────────────────────────────────────────────
const getAllBookings = async (req, res) => {
    try {
        const bookings_info = await Booking.find()
            .populate("user", "name email mobile")
            .populate({
                path: "property",
                populate: { path: "owner", select: "name email mobile _id" }
            });
        res.status(200).json({ bookings_info });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
};

// ─── DELETE USER ──────────────────────────────────────────────────────────────
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};

// ─── DELETE PROPERTY ──────────────────────────────────────────────────────────
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        await Property.findByIdAndDelete(id);
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete property" });
    }
};

// ─── GRANT OWNER ──────────────────────────────────────────────────────────────
const grantOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.role !== "owner") return res.status(400).json({ message: "User is not an owner" });

        user.grantStatus = "granted";
        await user.save();
        res.status(200).json({ message: "Owner granted successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Failed to grant owner" });
    }
};

module.exports = { getAllUsers, getAllProperties, getAllBookings, deleteUser, deleteProperty, grantOwner };