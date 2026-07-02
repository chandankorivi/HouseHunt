const express = require("express");
const router = express.Router();

const {
    addProperty,
    getMyProperties,
    updateProperty,
    deleteProperty
} = require("../controllers/ownerController");

const {
    authMiddleware,
    authorizeRoles
} = require("../middlewares/authMiddleware");

router.post(
    "/add-property",
    authMiddleware,
    authorizeRoles("owner"),
    addProperty
);

router.get(
    "/my-properties",
    authMiddleware,
    authorizeRoles("owner"),
    getMyProperties
);

router.put(
    "/update-property/:id",
    authMiddleware,
    authorizeRoles("owner"),
    updateProperty
);

router.delete(
    "/delete-property/:id",
    authMiddleware,
    authorizeRoles("owner"),
    deleteProperty
);

module.exports = router;