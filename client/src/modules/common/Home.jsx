import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import "./Home.css";

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loadingProps, setLoadingProps] = useState(true);

    useEffect(() => {
        API.get("/owner/featured")
            .then((res) => setFeaturedProperties(res.data.properties || []))
            .catch(() => setFeaturedProperties([]))
            .finally(() => setLoadingProps(false));
    }, []);

    const handlePropertyClick = (id) => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/all-properties`);
        }
    };

    return (
        <div className="home-wrap">

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="hero-section">
                <div className="hero-bg-orbs">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                </div>

                <div className="hero-content animate-fade-in">
                    <span className="hero-badge">🔍 Smart Property Search</span>
                    <h1 className="hero-title">
                        Find Your Perfect<br />
                        <span className="hero-gradient-text">Dream Home</span>
                    </h1>
                    <p className="hero-subtitle">
                        HouseHunt connects renters with property owners seamlessly.
                        Browse thousands of verified listings, book viewings, and
                        move in — all in one platform.
                    </p>
                    <div className="hero-cta-group">
                        <Link to="/all-properties" className="cta-primary">
                            🏘️ Browse Properties
                        </Link>
                        {!user && (
                            <Link to="/register" className="cta-secondary">
                                Get Started Free →
                            </Link>
                        )}
                        {user && (
                            <Link
                                to={user.role === "owner" ? "/owner" : user.role === "admin" ? "/admin" : "/renter"}
                                className="cta-secondary"
                            >
                                Go to Dashboard →
                            </Link>
                        )}
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-num">10k+</span>
                            <span className="stat-label">Properties</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">5k+</span>
                            <span className="stat-label">Happy Renters</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">2k+</span>
                            <span className="stat-label">Verified Owners</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>

                {/* Hero card floating */}
                <div className="hero-visual animate-fade-in" style={{ animationDelay: "0.25s" }}>
                    <div className="hero-float-card glass-dark">
                        <img
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                            alt="Luxury Villa"
                            className="hero-card-img"
                        />
                        <div className="hero-card-info">
                            <div className="price-badge">₹25,000<span>/mo</span></div>
                            <h4>Luxury Villa — Banjara Hills</h4>
                            <p>4 Beds · 3 Baths · 2,800 sqft</p>
                            <div className="hero-card-tags">
                                <span className="tag">Available</span>
                                <span className="tag">Verified</span>
                            </div>
                        </div>
                    </div>
                    <div className="floating-badge badge-a">🏆 Top Rated</div>
                    <div className="floating-badge badge-b">✅ Verified</div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────── */}
            <section className="section how-section">
                <div className="section-header">
                    <span className="section-tag">Simple & Fast</span>
                    <h2>How HouseHunt Works</h2>
                    <p>Three easy steps to find your next home</p>
                </div>
                <div className="steps-grid">
                    {[
                        { icon: "🔍", step: "01", title: "Search Properties", desc: "Browse thousands of verified listings filtered by location, price, and amenities." },
                        { icon: "📅", step: "02", title: "Book a Viewing", desc: "Schedule a visit at your convenience directly through our platform." },
                        { icon: "🏠", step: "03", title: "Move In", desc: "Finalize the agreement and move into your dream home hassle-free." },
                    ].map((s) => (
                        <div key={s.step} className="step-card">
                            <div className="step-number">{s.step}</div>
                            <div className="step-icon">{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ─────────────────────────────────── */}
            <section className="section features-section">
                <div className="section-header">
                    <span className="section-tag">Why Choose Us</span>
                    <h2>Everything You Need</h2>
                    <p>A platform built for both renters and property owners</p>
                </div>
                <div className="features-grid">
                    {[
                        { icon: "🛡️", title: "Verified Listings", desc: "Every property is verified by our team before listing to ensure authenticity." },
                        { icon: "⚡", title: "Instant Booking", desc: "Book viewings and send rental requests instantly without phone calls." },
                        { icon: "💬", title: "Direct Communication", desc: "Chat directly with owners or renters through our secure messaging system." },
                        { icon: "📊", title: "Owner Dashboard", desc: "Manage your properties, bookings, and earnings from a single dashboard." },
                        { icon: "🔔", title: "Real-time Alerts", desc: "Get instant notifications for new matches, booking updates, and messages." },
                        { icon: "🔒", title: "Secure & Private", desc: "Your data and transactions are protected with enterprise-grade security." },
                    ].map((f) => (
                        <div key={f.title} className="feature-card">
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURED PROPERTIES ───────────────────────── */}
            <section className="section featured-section">
                <div className="section-header">
                    <span className="section-tag">Live Listings</span>
                    <h2>Featured Properties</h2>
                    <p>Handpicked available properties — login to view details & book</p>
                </div>

                {loadingProps ? (
                    <div className="props-loading">
                        {[1, 2, 3].map(i => <div key={i} className="prop-skeleton" />)}
                    </div>
                ) : featuredProperties.length === 0 ? (
                    <div className="props-empty">
                        <span>🏗️</span>
                        <p>New properties are being added. Check back soon!</p>
                    </div>
                ) : (
                    <div className="props-grid">
                        {featuredProperties.map((prop) => (
                            <div
                                key={prop._id}
                                className="prop-card"
                                onClick={() => handlePropertyClick(prop._id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={e => e.key === "Enter" && handlePropertyClick(prop._id)}
                            >
                                <div className="prop-img-wrap">
                                    <img
                                        src={
                                            prop.images?.[0]
                                                ? (prop.images[0].startsWith("data:") ? prop.images[0] : `/images/${prop.images[0]}`)
                                                : `https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=70`
                                        }
                                        alt={prop.title}
                                        className="prop-img"
                                    />
                                    <span className="prop-badge">{prop.listingType === "rent" ? "For Rent" : "For Sale"}</span>
                                    {!user && (
                                        <div className="prop-lock-overlay">
                                            <span>🔒 Login to View</span>
                                        </div>
                                    )}
                                </div>
                                <div className="prop-info">
                                    <div className="prop-price">₹{Number(prop.price).toLocaleString()}<span>/mo</span></div>
                                    <h3 className="prop-title">{prop.title}</h3>
                                    <p className="prop-location">📍 {prop.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="view-all-wrap">
                    <Link to="/all-properties" className="cta-primary">View All Properties →</Link>
                </div>
            </section>

            {/* ── CTA BANNER ───────────────────────────────── */}
            {!user && (
                <section className="cta-banner">
                    <div className="cta-banner-inner">
                        <h2>Ready to Find Your Home?</h2>
                        <p>Join thousands of happy renters and property owners on HouseHunt</p>
                        <div className="cta-banner-btns">
                            <Link to="/register" className="cta-primary">Create Free Account</Link>
                            <Link to="/login" className="cta-secondary-dark">Already a member? Sign In</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── FOOTER ────────────────────────────────────── */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <span className="footer-logo">🏠 HouseHunt</span>
                        <p>Your trusted platform for finding and listing rental properties across India.</p>
                    </div>
                    <div className="footer-links">
                        <div>
                            <h4>Platform</h4>
                            <Link to="/all-properties">Browse Properties</Link>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 HouseHunt. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}