
const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

const getAllUsers = async (req, res) => {

    const users_info = await User.find();

    res.status(200).json({
        users_info
    });

};

const getAllProperties = async (req,res) => {

    const  properties_info = await Property.find();

    res.status(200).json({
        properties_info
    });

};

const getAllBookings = async (req, res) => {

    const bookings_info = await Booking.find();

    res.status(200).json({
        bookings_info
    });

};

const deleteUser = async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
        message: "User deleted successfully"
    });

};

const deleteProperty = async (req, res) => {

    const { id } = req.params;

    await Property.findByIdAndDelete(id);

    res.status(200).json({
        message: "Property deleted successfully"
    });

};

module.exports = { getAllUsers,getAllProperties,getAllBookings,deleteUser,deleteProperty};