
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

    if (status === "approved") {
        if (booking.property.listingType === "rent") {
            booking.property.status = "rented";
        } else {
            booking.property.status = "sold";
        }
        await booking.property.save();
    }

    res.status(200).json({
        message: "Booking status updated successfully",
        booking
    });

};

const getOwnerBookings = async (req, res) => {
    // Find properties owned by this user
    const properties = await Property.find({ owner: req.user._id }).select('_id');
    const propertyIds = properties.map(p => p._id);
    
    // Find bookings for these properties
    const bookings = await Booking.find({
        property: { $in: propertyIds }
    }).populate("property").populate("user", "name email mobile");

    res.status(200).json({
        bookings
    });
};

module.exports = {
    bookProperty,
    getMyBookings,
    updateBookingStatus,
    getOwnerBookings
};