
const Booking = require("../models/BookingSchema");
const Property = require("../models/PropertySchema");

const bookProperty = async (req, res) => {

    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    const booking = await Booking.create({
        user: req.user._id,
        property: id
    });

    res.status(201).json({
        message: "Booking created successfully",
        booking
    });

};

const getMyBookings = async (req, res) => {

    const bookings = await Booking.find({
        user: req.user._id
    }).populate("property");

    res.status(200).json({
        bookings
    });

};

const updateBookingStatus = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id).populate("property");

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    if (booking.property.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized"
        });
    }

    booking.status = status;

    await booking.save();

    res.status(200).json({
        message: "Booking status updated successfully",
        booking
    });

};

module.exports = {
    bookProperty,
    getMyBookings,
    updateBookingStatus
};