const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getAllProperties,
    getAllBookings,
    deleteUser,
    deleteProperty,
    grantOwner
} = require("../controllers/adminController");

router.get(
    "/users",
    getAllUsers
);

router.get(
    "/properties",
    getAllProperties
);

router.get(
    "/bookings",
    getAllBookings
);

router.delete(
    "/user/:id",
    deleteUser
);

router.delete(
    "/property/:id",
    deleteProperty
);

router.put(
    "/grant-owner/:id",
    grantOwner
);

module.exports = router;