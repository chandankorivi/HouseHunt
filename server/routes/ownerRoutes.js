const express = require("express");
const router = express.Router();

const {
    addProperty,
    getMyProperties,
    deleteProperty,
    getAllProperties,
    updateProperty,
    getSingleProperty,
    getFeaturedProperties
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
    "/all-properties",
    getAllProperties
);

// Public route – no auth required
router.get("/featured", getFeaturedProperties);


router.get(
    "/my-properties",
    authMiddleware,
    authorizeRoles("owner"),
    getMyProperties
);



router.delete(
    "/delete-property/:id",
    authMiddleware,
    authorizeRoles("owner"),
    deleteProperty
);

router.put(
    "/update-property/:id",
    authMiddleware,
    authorizeRoles("owner"),
    updateProperty
);

router.get(
    "/property/:id",
    authMiddleware,
    authorizeRoles("owner"),
    getSingleProperty
);

module.exports = router;