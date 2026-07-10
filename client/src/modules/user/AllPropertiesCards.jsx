import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function AllPropertiesCards({ property }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState({ fullName: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBookingClick = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        // Prefill if available
        setBookingData({
            fullName: user.name || "",
            email: user.email || "",
            phone: user.mobile || ""
        });
        setShowModal(true);
    };

    const submitBooking = async () => {
        setIsSubmitting(true);
        try {
            const res = await API.post(`/booking/book-property/${property._id}`, {});
            alert(res.data.message);
            setShowModal(false);
        } catch (err) {
            alert(err.response?.data?.message || "Booking Failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Use userId stored at login – avoids re-decoding JWT and ObjectId mismatch
    const currentUserId = user?.userId || null;

    const isSold = property.status === "sold";
    const isOwnerOfProperty = currentUserId && property.owner
        ? currentUserId.toString() === property.owner.toString()
        : false;

    const getImageSrc = (img) => img?.startsWith("data:") ? img : `/images/${img}`;

    return (
        <>
            <div className="property-card" style={{ opacity: isSold ? 0.75 : 1 }}>
                <div style={{ position: "relative" }}>
                    {property.images && property.images.length > 0 && property.images[0] ? (
                        <img
                            src={getImageSrc(property.images[0])}
                            alt={property.title}
                            className="property-image"
                        />
                    ) : (
                        <div className="property-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0' }}>
                            <span style={{ fontSize: '2rem' }}>🏠</span>
                        </div>
                    )}
                    
                    {isSold && (
                        <div style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "#ef4444",
                            color: "white",
                            padding: "5px 15px",
                            borderRadius: "20px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                            Sold Out
                        </div>
                    )}
                </div>

                <div className="property-content">
                    <h2 className="property-title">
                        {property.title}
                    </h2>

                    <div className="property-price">
                        ₹{property.price}
                    </div>

                    <div className="property-details">
                        <span className="detail-badge">📍 {property.location}</span>
                        <span className="detail-badge">🏷 {property.listingType}</span>
                        <span className="detail-badge">
                            <span style={{color: isSold ? '#ef4444' : '#10b981'}}>●</span>
                            {property.status}
                        </span>
                    </div>

                    <p className="property-description">
                        {property.description}
                    </p>

                    {!isOwnerOfProperty && (
                        <button
                            className="book-btn"
                            onClick={handleBookingClick}
                            disabled={isSold}
                            style={{
                                background: isSold ? "#9ca3af" : "var(--primary)",
                                cursor: isSold ? "not-allowed" : "pointer"
                            }}
                        >
                            {isSold ? "Unavailable" : "Book Property"}
                        </button>
                    )}
                </div>
            </div>

            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.75)", zIndex: 9999,
                    display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"
                }}>
                    <div style={{
                        background: "#1e293b", color: "white", padding: "24px", borderRadius: "12px",
                        width: "100%", maxWidth: "600px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}>
                        <button onClick={() => setShowModal(false)} style={{
                            position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.1)", border: "none", color: "#cbd5e1", cursor: "pointer", fontSize: "1.2rem", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                        }}>✖</button>
                        <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "1.25rem", fontWeight: "600" }}>Property Info</h3>
                        
                        {property.images && property.images.length > 0 && property.images[0] && (
                            <img src={getImageSrc(property.images[0])} alt="property" style={{width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px"}} />
                        )}
                        
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "24px"}}>
                            <div><strong style={{color: "white"}}>Owner Contact:</strong> {property.contact || "Not provided"}</div>
                            <div><strong style={{color: "white"}}>Location:</strong> {property.location}</div>
                            <div><strong style={{color: "white"}}>Price:</strong> ₹{property.price}</div>
                            <div><strong style={{color: "white"}}>Type:</strong> {property.listingType}</div>
                            <div style={{gridColumn: "span 2"}}><strong style={{color: "white"}}>Additional Info:</strong> {property.description}</div>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px"}}>
                            <input type="text" placeholder="Your Full Name" style={{width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none"}} value={bookingData.fullName} onChange={(e) => setBookingData({...bookingData, fullName: e.target.value})} />
                            <input type="email" placeholder="Email Address" style={{width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none"}} value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} />
                            <input type="tel" placeholder="Phone Number" style={{width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none"}} value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                        </div>
                        
                        <button onClick={submitBooking} disabled={isSubmitting} style={{
                            width: "100%", padding: "14px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", fontSize: "1rem", fontWeight: "600", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, transition: "background 0.2s"
                        }}>
                            {isSubmitting ? "Processing..." : "Book Property"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}