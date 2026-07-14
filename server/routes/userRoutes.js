const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
    getUserProfile
} = require("../controllers/userController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;