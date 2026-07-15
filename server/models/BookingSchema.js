
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Property",
        required : true 
    },

    bookingDate : {
        type : Date,
        default : Date.now 
    },

    status : {
        type : String,
        enum: ["pending", "approved", "rejected"], 
        default: "pending"
    }

});

module.exports = mongoose.model("Booking",BookingSchema);