
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

const {
    authMiddleware,
    authorizeRoles
} = require("../middlewares/authMiddleware");

router.get(
    "/users",
    authMiddleware,
    authorizeRoles("admin"),
    getAllUsers
);

router.get(
    "/properties",
    authMiddleware,
    authorizeRoles("admin"),
    getAllProperties
);

router.get(
    "/bookings",
    authMiddleware,
    authorizeRoles("admin"),
    getAllBookings
);

router.delete(
    "/user/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteUser
);

router.delete(
    "/property/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteProperty
);

router.put(
    "/grant-owner/:id",
    authMiddleware,
    authorizeRoles("admin"),
    grantOwner
);

module.exports = router;