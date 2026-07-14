
const express = require("express");
const router = express.Router();

const {
    bookProperty,
    getMyBookings,
    updateBookingStatus,
    getOwnerBookings
} = require("../controllers/bookingController");

const {
    authMiddleware,
    authorizeRoles
} = require("../middlewares/authMiddleware");

// User books a property
router.post(
    "/book-property/:id",
    authMiddleware,
    authorizeRoles("user", "owner", "admin"),
    bookProperty
);

// User views all bookings
router.get(
    "/my-bookings",
    authMiddleware,
    authorizeRoles("user", "owner", "admin"),
    getMyBookings
);

// Owner approves/rejects booking
router.put(
    "/update-booking/:id",
    authMiddleware,
    authorizeRoles("owner"),
    updateBookingStatus
);

// Owner views all bookings on their properties
router.get(
    "/owner-bookings",
    authMiddleware,
    authorizeRoles("owner"),
    getOwnerBookings
);

module.exports = router;