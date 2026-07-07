
const express = require("express");
const router = express.Router();

const {
    bookProperty,
    getMyBookings,
    updateBookingStatus
} = require("../controllers/bookingController");

const {
    authMiddleware,
    authorizeRoles
} = require("../middlewares/authMiddleware");

// User books a property
router.post(
    "/book-property/:id",
    authMiddleware,
    authorizeRoles("user"),
    bookProperty
);

// User views all bookings
router.get(
    "/my-bookings",
    authMiddleware,
    authorizeRoles("user"),
    getMyBookings
);

// Owner approves/rejects booking
router.put(
    "/update-booking/:id",
    authMiddleware,
    authorizeRoles("owner"),
    updateBookingStatus
);

module.exports = router;