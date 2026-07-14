
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ─── REGISTER ───────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body;



        // Validate required fields
        if (!name || !email || !mobile || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address." });
        }

        // Validate mobile: any 10-digit number
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: "Mobile number must be exactly 10 digits." });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Check existing mobile
        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({ message: "Mobile number already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User created", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            role: user.role,
            name: user.name,
            email: user.email,
            userId: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed. Please try again." });
    }
};

// ─── FORGOT PASSWORD – Step 1: Send OTP ─────────────────────────────────────
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required." });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not found." });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store OTP (hashed for security)
        const hashedOtp = await bcrypt.hash(otp, 10);
        await User.findByIdAndUpdate(user._id, {
            otp: hashedOtp,
            otpExpiry,
            otpUsed: false
        });

        // In production: send via email/SMS. Here we return it for demo.
        res.json({
            message: "OTP sent successfully.",
            otp, // Remove in production; use email service instead
            email
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send OTP. Please try again." });
    }
};

// ─── FORGOT PASSWORD – Step 2: Verify OTP ───────────────────────────────────
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required." });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not found." });

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "No OTP was requested. Please request a new one." });
        }

        if (user.otpUsed) {
            return res.status(400).json({ message: "OTP already used. Please request a new one." });
        }

        if (new Date() > new Date(user.otpExpiry)) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        const isOtpMatch = await bcrypt.compare(otp, user.otp);
        if (!isOtpMatch) {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        res.json({ message: "OTP verified successfully.", email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "OTP verification failed." });
    }
};

// ─── FORGOT PASSWORD – Step 3: Reset Password ────────────────────────────────
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;

        if (!email || !otp || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not found." });

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "No OTP was requested." });
        }

        if (user.otpUsed) {
            return res.status(400).json({ message: "OTP already used." });
        }

        if (new Date() > new Date(user.otpExpiry)) {
            return res.status(400).json({ message: "OTP has expired." });
        }

        const isOtpMatch = await bcrypt.compare(otp, user.otp);
        if (!isOtpMatch) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            otp: null,
            otpExpiry: null,
            otpUsed: true
        });

        res.json({ message: "Password updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Password reset failed." });
    }
};

// ─── GET PROFILE ──────────────────────────────────────────────────────────────
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -otp -otpExpiry');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error fetching profile" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
    getUserProfile
};