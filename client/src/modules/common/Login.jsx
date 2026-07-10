import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../components/Toast";
import "./Auth.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const validate = () => {
        if (!email.trim() || !password.trim()) {
            setError("Both fields are required.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await API.post("/user/login", { email, password });
            login(res.data); // store in context + localStorage
            showToast("Login Successful! Welcome back 👋", "success");

            setTimeout(() => {
                if (res.data.role === "admin") navigate("/admin");
                else if (res.data.role === "owner") navigate("/owner");
                else navigate("/renter");
            }, 800);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Email or Password");
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

            <div className="auth-card animate-fade-in">
                <div className="auth-card-header">
                    <div className="auth-logo">🏠</div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your HouseHunt account</p>
                </div>

                {error && (
                    <div className="auth-error-banner" role="alert">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="login-email">Email Address</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(""); }}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <div className="input-with-toggle">
                            <input
                                id="login-password"
                                type={showPass ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-pass"
                                onClick={() => setShowPass(!showPass)}
                                aria-label="Toggle password visibility"
                            >
                                {showPass ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="forgot-link-row">
                        <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                    </div>

                    <button
                        id="login-submit"
                        className="auth-submit-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="btn-spinner" /> : "Login"}
                    </button>
                </form>

                <div className="auth-card-footer">
                    <p>Don't have an account? <Link to="/register" className="auth-link">Register Now</Link></p>
                </div>
            </div>
        </div>
    );
}