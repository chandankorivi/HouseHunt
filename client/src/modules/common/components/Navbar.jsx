import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { showToast } from "../../../components/Toast";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        showToast("Logged out successfully", "info");
        navigate("/login");
        setMenuOpen(false);
    };

    const close = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo" onClick={close}>
                    <div className="logo-icon-wrap">🏠</div>
                    <span className="logo-text">HouseHunt</span>
                </Link>

                {/* Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>

                {/* Links */}
                <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
                    <li><Link to="/" onClick={close}>Home</Link></li>
                    <li><Link to="/all-properties" onClick={close}>Browse Properties</Link></li>
                    <li><Link to="/about" onClick={close}>About</Link></li>
                    <li><Link to="/contact" onClick={close}>Contact</Link></li>
                    {user?.role === "admin" && (
                        <li><Link to="/admin" onClick={close}>Admin Dashboard</Link></li>
                    )}

                    {user ? (
                        <>
                            {user.role === "owner" && (
                                <>
                                    <li><Link to="/my-properties" onClick={close}>My Properties</Link></li>
                                    <li><Link to="/owner-bookings" onClick={close}>Bookings</Link></li>
                                    <li><Link to="/owner" onClick={close}>Dashboard</Link></li>
                                </>
                            )}
                            {user.role === "user" && (
                                <>
                                    <li><Link to="/my-bookings" onClick={close}>My Bookings</Link></li>
                                    <li><Link to="/renter" onClick={close}>Dashboard</Link></li>
                                </>
                            )}

                            <li className="nav-user-name">👤 {user.name}</li>
                            <li>
                                <button onClick={handleLogout} className="btn-nav-logout">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="btn-nav-login" onClick={close}>Login</Link></li>
                            <li><Link to="/register" className="btn-nav-register" onClick={close}>Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}