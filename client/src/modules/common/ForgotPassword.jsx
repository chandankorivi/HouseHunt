import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { showToast } from "../../components/Toast";
import "./Auth.css";

const strongPassRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // For demo: store OTP returned by server
    const [demoOtp, setDemoOtp] = useState("");

    // ── Step 1: Send OTP ──────────────────────────────────
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) return setError("Email is required.");
        if (!emailRegex.test(email)) return setError("Please enter a valid email address.");

        setLoading(true);
        try {
            const res = await API.post("/user/forgot-password", { email });
            setDemoOtp(res.data.otp); // Demo only – remove in production
            showToast("OTP sent! Check your email (or see the hint below).", "info");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Verify OTP ────────────────────────────────
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (!otp.trim() || otp.length !== 6) return setError("Please enter the 6-digit OTP.");

        setLoading(true);
        try {
            await API.post("/user/verify-otp", { email, otp });
            showToast("OTP verified successfully!", "success");
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 3: Reset Password ────────────────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (!newPassword) return setError("New password is required.");
        if (!strongPassRegex.test(newPassword))
            return setError("Min 8 chars with uppercase, number & special character.");
        if (newPassword !== confirmPassword) return setError("Passwords do not match.");

        setLoading(true);
        try {
            await API.post("/user/reset-password", { email, otp, newPassword, confirmPassword });
            showToast("Password Updated Successfully! Please login. 🎉", "success");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Password reset failed.");
        } finally {
            setLoading(false);
        }
    };

    const stepTitles = {
        1: { icon: "🔑", title: "Forgot Password", subtitle: "Enter your email to receive an OTP" },
        2: { icon: "📲", title: "Verify OTP", subtitle: `Enter the 6-digit code sent to ${email}` },
        3: { icon: "🔒", title: "Reset Password", subtitle: "Set your new password" },
    };

    const current = stepTitles[step];

    return (
        <div className="auth-page">
            <div className="auth-bg-orbs">
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
            </div>

            <div className="auth-card animate-fade-in">
                {/* Step indicator */}
                <div className="step-indicator">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`step-dot ${step >= s ? "active" : ""} ${step === s ? "current" : ""}`}>
                            {step > s ? "✓" : s}
                        </div>
                    ))}
                    <div className="step-line" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                </div>

                <div className="auth-card-header">
                    <div className="auth-logo">{current.icon}</div>
                    <h1>{current.title}</h1>
                    <p>{current.subtitle}</p>
                </div>

                {error && (
                    <div className="auth-error-banner" role="alert">
                        ⚠️ {error}
                    </div>
                )}

                {/* ── Step 1 ── */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="auth-form" noValidate>
                        <div className="form-group">
                            <label htmlFor="fp-email">Email Address</label>
                            <input
                                id="fp-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(""); }}
                                autoComplete="email"
                            />
                        </div>
                        <button id="send-otp-btn" className="auth-submit-btn" type="submit" disabled={loading}>
                            {loading ? <span className="btn-spinner" /> : "Send OTP"}
                        </button>
                    </form>
                )}

                {/* ── Step 2 ── */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="auth-form" noValidate>
                        {/* Demo OTP hint */}
                        {demoOtp && (
                            <div className="demo-otp-hint">
                                🧪 <strong>Demo OTP:</strong> {demoOtp}
                                <br /><small>(In production, this would be sent via email/SMS)</small>
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="fp-otp">6-Digit OTP</label>
                            <input
                                id="fp-otp"
                                type="text"
                                placeholder="______"
                                value={otp}
                                onChange={e => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
                                maxLength={6}
                                className="otp-input"
                                autoComplete="one-time-code"
                            />
                        </div>
                        <button id="verify-otp-btn" className="auth-submit-btn" type="submit" disabled={loading}>
                            {loading ? <span className="btn-spinner" /> : "Verify OTP"}
                        </button>
                        <button
                            type="button"
                            className="resend-otp-btn"
                            onClick={() => { setStep(1); setOtp(""); setError(""); }}
                        >
                            ← Resend OTP
                        </button>
                    </form>
                )}

                {/* ── Step 3 ── */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="auth-form" noValidate>
                        <div className="form-group">
                            <label htmlFor="fp-newpass">New Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="fp-newpass"
                                    type={showNew ? "text" : "password"}
                                    placeholder="Min 8 chars, uppercase, number, special"
                                    value={newPassword}
                                    onChange={e => { setNewPassword(e.target.value); setError(""); }}
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowNew(!showNew)}>
                                    {showNew ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fp-confirm">Confirm Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="fp-confirm"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter your new password"
                                    value={confirmPassword}
                                    onChange={e => { setConfirmPassword(e.target.value); setError(""); }}
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowConfirm(!showConfirm)}>
                                    {showConfirm ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <button id="reset-pass-btn" className="auth-submit-btn" type="submit" disabled={loading}>
                            {loading ? <span className="btn-spinner" /> : "Reset Password"}
                        </button>
                    </form>
                )}

                <div className="auth-card-footer">
                    <p><Link to="/login" className="auth-link">← Back to Login</Link></p>
                </div>
            </div>
        </div>
    );
}
