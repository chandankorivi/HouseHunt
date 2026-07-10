import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { showToast } from "../../components/Toast";
import "./Auth.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/; // Any 10-digit number

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "", email: "", mobile: "", password: "", confirmPassword: "", role: "user", adminCode: ""
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showAdminCode, setShowAdminCode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
        setServerError("");
    };

    const validate = () => {
        const errs = {};

        if (!form.name.trim()) errs.name = "Full name is required.";
        else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";

        if (!form.email.trim()) errs.email = "Email is required.";
        else if (!emailRegex.test(form.email)) errs.email = "Please enter a valid email address.";

        if (!form.mobile.trim()) errs.mobile = "Mobile number is required.";
        else if (!mobileRegex.test(form.mobile)) errs.mobile = "Enter a valid 10-digit mobile number.";

        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";

        if (form.role === "admin") {
            const code = form.adminCode ? form.adminCode.trim() : "";
            if (code !== "2113" && code !== "password-2113") {
                errs.adminCode = "Failed: Invalid Admin Code";
            }
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        try {
            await API.post("/user/register", {
                name: form.name.trim(),
                email: form.email.trim(),
                mobile: form.mobile.trim(),
                password: form.password,
                role: form.role,
                adminCode: form.adminCode ? form.adminCode.trim() : ""
            });
            showToast("Registration Successful! Please login. 🎉", "success");
            setTimeout(() => navigate("/login"), 1200);
        } catch (err) {
            const msg = err.response?.data?.message || "Registration failed. Please try again.";
            if (msg.toLowerCase().includes("email")) setErrors(prev => ({ ...prev, email: msg }));
            else if (msg.toLowerCase().includes("mobile")) setErrors(prev => ({ ...prev, mobile: msg }));
            else setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-orbs">
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
            </div>

            <div className="auth-card auth-card-wide animate-fade-in">
                <div className="auth-card-header">
                    <div className="auth-logo">📝</div>
                    <h1>Create Account</h1>
                    <p>Join HouseHunt to find or list properties</p>
                </div>

                {serverError && (
                    <div className="auth-error-banner" role="alert">
                        ⚠️ {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form" noValidate>
                    {/* Full Name */}
                    <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                        <label htmlFor="reg-name">Full Name</label>
                        <input
                            id="reg-name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className={`form-group ${errors.email ? "has-error" : ""}`}>
                        <label htmlFor="reg-email">Email Address</label>
                        <input
                            id="reg-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    {/* Mobile */}
                    <div className={`form-group ${errors.mobile ? "has-error" : ""}`}>
                        <label htmlFor="reg-mobile">Mobile Number</label>
                        <input
                            id="reg-mobile"
                            type="tel"
                            name="mobile"
                            placeholder=""
                            value={form.mobile}
                            onChange={handleChange}
                            maxLength={10}
                        />
                        {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                    </div>

                    {/* Password */}
                    <div className={`form-group ${errors.password ? "has-error" : ""}`}>
                        <label htmlFor="reg-password">Password</label>
                        <div className="input-with-toggle">
                            <input
                                id="reg-password"
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="Enter a password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                {showPass ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className={`form-group ${errors.confirmPassword ? "has-error" : ""}`}>
                        <label htmlFor="reg-confirm">Confirm Password</label>
                        <div className="input-with-toggle">
                            <input
                                id="reg-confirm"
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                            <button type="button" className="toggle-pass" onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                    </div>

                    {/* Role */}
                    <div className={`form-group ${errors.role ? "has-error" : ""}`}>
                        <label>I am a...</label>
                        <div className="role-selector">
                            <label className={`role-option ${form.role === "user" ? "selected" : ""}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={form.role === "user"}
                                    onChange={handleChange}
                                />
                                <span className="role-icon">🏡</span>
                                <span className="role-label">Renter</span>
                                <span className="role-desc">Looking for a property</span>
                            </label>
                            <label className={`role-option ${form.role === "owner" ? "selected" : ""}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="owner"
                                    checked={form.role === "owner"}
                                    onChange={handleChange}
                                />
                                <span className="role-icon">🏢</span>
                                <span className="role-label">Owner</span>
                                <span className="role-desc">I have a property to list</span>
                            </label>
                            <label className={`role-option ${form.role === "admin" ? "selected" : ""}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={form.role === "admin"}
                                    onChange={handleChange}
                                />
                                <span className="role-icon">🛡️</span>
                                <span className="role-label">Admin</span>
                                <span className="role-desc">Manage the platform</span>
                            </label>
                        </div>
                        {errors.role && <span className="field-error">{errors.role}</span>}
                    </div>

                    {form.role === "admin" && (
                        <div className={`form-group ${errors.adminCode ? "has-error" : ""}`}>
                            <label>Admin Code</label>
                            <div className="password-wrapper">
                                <input
                                    type={showAdminCode ? "text" : "password"}
                                    name="adminCode"
                                    placeholder="Enter secret code"
                                    value={form.adminCode}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowAdminCode(!showAdminCode)}
                                >
                                    {showAdminCode ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.adminCode && <span className="field-error">{errors.adminCode}</span>}
                        </div>
                    )}

                    <button
                        id="register-submit"
                        className="auth-submit-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="btn-spinner" /> : "Create Account"}
                    </button>
                </form>

                <div className="auth-card-footer">
                    <p>Already have an account? <Link to="/login" className="auth-link">Sign in here</Link></p>
                </div>
            </div>
        </div>
    );
}