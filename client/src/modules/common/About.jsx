import { Link } from "react-router-dom";
import "./About.css";

const team = [
    { name: "K.Prem Sagar", role: "Product Lead", emoji: "👩‍💼" },
    { name: "K.Chandan", role: "Backend Engineer", emoji: "👨‍💻" },
    { name: "K.Lavanaya", role: "UX Designer", emoji: "🎨" },
    { name: "B.Pravalika", role: "Frontend Engineer", emoji: "⚡" },
];

const values = [
    { icon: "🔍", title: "Transparency", desc: "Every listing is verified and accurately represented." },
    { icon: "🤝", title: "Trust", desc: "We build lasting relationships between owners and renters." },
    { icon: "⚡", title: "Simplicity", desc: "Finding a home should be effortless and stress-free." },
    { icon: "💡", title: "Innovation", desc: "We constantly improve to serve you better." },
];

export default function About() {
    return (
        <div className="about-wrap">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-bg" />
                <div className="about-hero-content animate-fade-in">
                    <span className="section-tag">Our Story</span>
                    <h1>About <span className="gradient-text">HouseHunt</span></h1>
                    <p>
                        HouseHunt was born out of a simple frustration — finding a rental home in India 
                        shouldn't be this hard. We built a platform that puts people first, making the 
                        property search experience transparent, fast, and trustworthy.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="about-section mission-section">
                <div className="mission-grid">
                    <div className="mission-text">
                        <span className="section-tag">Our Mission</span>
                        <h2>Connecting People with <span className="gradient-text">Perfect Spaces</span></h2>
                        <p>
                            We believe everyone deserves a home they love. Our mission is to remove 
                            the friction from renting — no more phone tag with brokers, no more misleading 
                            listings, no more wasted weekends.
                        </p>
                        <p>
                            Whether you're a renter searching for your next home or a property owner 
                            looking to fill vacancies, HouseHunt is your trusted partner.
                        </p>
                        <Link to="/register" className="cta-primary-purple">Get Started Free →</Link>
                    </div>
                    <div className="mission-stats">
                        {[
                            { num: "10,000+", label: "Properties Listed" },
                            { num: "5,000+", label: "Happy Renters" },
                            { num: "2,000+", label: "Verified Owners" },
                            { num: "50+", label: "Cities Covered" },
                        ].map(s => (
                            <div key={s.label} className="mission-stat-card">
                                <span className="m-num">{s.num}</span>
                                <span className="m-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-section values-section">
                <div className="section-header">
                    <span className="section-tag">What We Stand For</span>
                    <h2>Our Core Values</h2>
                </div>
                <div className="values-grid">
                    {values.map(v => (
                        <div key={v.title} className="value-card">
                            <div className="value-icon">{v.icon}</div>
                            <h3>{v.title}</h3>
                            <p>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="about-section team-section">
                <div className="section-header">
                    <span className="section-tag">The People</span>
                    <h2>Meet Our Team</h2>
                    <p>Passionate builders on a mission to simplify real estate</p>
                </div>
                <div className="team-grid">
                    {team.map(t => (
                        <div key={t.name} className="team-card">
                            <div className="team-avatar">{t.emoji}</div>
                            <h3>{t.name}</h3>
                            <p>{t.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <h2>Ready to join HouseHunt?</h2>
                <p>Start your journey — whether renting or listing.</p>
                <div className="about-cta-btns">
                    <Link to="/register" className="cta-primary-purple">Create Account</Link>
                    <Link to="/contact" className="cta-outline-purple">Contact Us</Link>
                </div>
            </section>
        </div>
    );
}
