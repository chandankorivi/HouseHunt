import { useState } from "react";
import "./Contact.css";

const contactInfo = [
    { icon: "📧", label: "Email", value: "support@househunt.in" },
    { icon: "📞", label: "Phone", value: "+91 98765 43210" },
    { icon: "📍", label: "Address", value: "Hyderabad, Telangana, India" },
    { icon: "🕐", label: "Support Hours", value: "Mon–Sat, 9AM – 7PM IST" },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.subject || !form.message) {
            setError("Please fill in all fields.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        // In production, send to backend. For now simulate success.
        setSubmitted(true);
    };

    return (
        <div className="contact-wrap">
            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero-bg" />
                <div className="contact-hero-content animate-fade-in">
                    <span className="section-tag">We're Here</span>
                    <h1>Contact <span className="gradient-text">HouseHunt</span></h1>
                    <p>Have a question, feedback, or need help? We'd love to hear from you.</p>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-grid">
                    {/* Info Panel */}
                    <div className="contact-info-panel">
                        <h2>Get in Touch</h2>
                        <p>Our team is ready to help you find your perfect home or resolve any issues.</p>

                        <div className="contact-info-items">
                            {contactInfo.map(info => (
                                <div key={info.label} className="contact-info-item">
                                    <span className="ci-icon">{info.icon}</span>
                                    <div>
                                        <span className="ci-label">{info.label}</span>
                                        <span className="ci-value">{info.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="contact-social">
                            <p>Follow Us</p>
                            <div className="social-icons">
                                {["🐦", "💼", "📸", "▶️"].map((s, i) => (
                                    <div key={i} className="social-icon">{s}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Panel */}
                    <div className="contact-form-panel">
                        {submitted ? (
                            <div className="contact-success animate-fade-in">
                                <div className="success-icon">🎉</div>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                <button
                                    className="contact-again-btn"
                                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2>Send a Message</h2>

                                {error && (
                                    <div className="contact-error">⚠️ {error}</div>
                                )}

                                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                                    <div className="cf-row">
                                        <div className="cf-group">
                                            <label htmlFor="ct-name">Your Name</label>
                                            <input
                                                id="ct-name"
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="cf-group">
                                            <label htmlFor="ct-email">Email Address</label>
                                            <input
                                                id="ct-email"
                                                type="email"
                                                name="email"
                                                placeholder="you@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="cf-group">
                                        <label htmlFor="ct-subject">Subject</label>
                                        <input
                                            id="ct-subject"
                                            type="text"
                                            name="subject"
                                            placeholder="How can we help?"
                                            value={form.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="cf-group">
                                        <label htmlFor="ct-message">Message</label>
                                        <textarea
                                            id="ct-message"
                                            name="message"
                                            placeholder="Write your message here..."
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={5}
                                        />
                                    </div>

                                    <button id="contact-submit" type="submit" className="contact-submit-btn">
                                        Send Message 📤
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
