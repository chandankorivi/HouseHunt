import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { showToast } from "../../../components/Toast";
import "../RoleDashboard.css";

const PROPERTY_TYPES = ["residential", "commercial", "plot/land"];
const LISTING_TYPES  = ["rent", "sale"];
const STATUS_OPTS    = ["available", "sold"];

export default function AddProperty() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);   // data-URL for preview
    const [imageData, setImageData]       = useState("");     // data-URL sent to server
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        propertyType: "residential",
        listingType: "rent",
        price: "",
        status: "available",
        description: "",
        ownerContact: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate it is a JPEG
        if (!file.type.match(/image\/jpe?g/)) {
            showToast("Only .jpg / .jpeg files are allowed.", "error");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setImagePreview(ev.target.result);
            setImageData(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.location || !formData.price || !imageData) {
            showToast("Please fill all required fields and upload a photo.", "error");
            return;
        }
        setLoading(true);
        try {
            await API.post("/owner/add-property", {
                title: formData.title,
                location: formData.location,
                propertyType: formData.propertyType,
                listingType: formData.listingType,
                price: Number(formData.price),
                status: formData.status,
                description: formData.description,
                images: [imageData],
                ownerContact: formData.ownerContact
            });
            showToast("Property added successfully! 🎉", "success");
            setTimeout(() => navigate("/my-properties"), 1000);
        } catch (err) {
            showToast(err.response?.data?.message || "Failed to add property", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="role-page">
            <div className="rp-header" style={{ textAlign: "center" }}>
                <h1>🏗️ Add New Property</h1>
                <p>List your property for rent or sale on HouseHunt</p>
            </div>

            <div className="form-glass-card">
                <form onSubmit={handleSubmit} noValidate>

                    {/* Title */}
                    <div className="fg">
                        <label>Property Title *</label>
                        <input
                            name="title"
                            placeholder="e.g. Spacious 3BHK Apartment"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="fg">
                        <label>Address / Location *</label>
                        <input
                            name="location"
                            placeholder="e.g. Banjara Hills, Hyderabad"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Property Type + AD Type */}
                    <div className="form-row">
                        <div className="fg">
                            <label>Property Type *</label>
                            <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                                {PROPERTY_TYPES.map(t => (
                                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="fg">
                            <label>AD Type *</label>
                            <select name="listingType" value={formData.listingType} onChange={handleChange}>
                                {LISTING_TYPES.map(t => (
                                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Price + Status */}
                    <div className="form-row">
                        <div className="fg">
                            <label>Amount (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="e.g. 25000"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                        <div className="fg">
                            <label>Availability</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                {STATUS_OPTS.map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Owner Contact */}
                    <div className="fg">
                        <label>Owner Contact Number</label>
                        <input
                            name="ownerContact"
                            placeholder="e.g. 9876543210"
                            value={formData.ownerContact}
                            onChange={handleChange}
                            maxLength={10}
                        />
                    </div>

                    {/* Description */}
                    <div className="fg">
                        <label>Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe your property — amenities, floor, furnishing…"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Photo Upload */}
                    <div className="fg">
                        <label>Property Photo * <span style={{ color: "rgba(255,255,255,0.4)", fontSize:"0.8rem" }}>(JPG / JPEG only)</span></label>

                        {/* Hidden real file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg,.jpeg,image/jpeg"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="propertyPhotoInput"
                        />

                        {/* Custom upload button */}
                        <div
                            className="photo-upload-box"
                            onClick={() => fileInputRef.current.click()}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Property preview"
                                    className="photo-preview-img"
                                />
                            ) : (
                                <div className="photo-upload-placeholder">
                                    <span className="photo-upload-icon">📷</span>
                                    <p>Click to upload a <strong>.jpg</strong> photo</p>
                                    <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>Only JPEG images accepted</p>
                                </div>
                            )}
                        </div>

                        {imagePreview && (
                            <button
                                type="button"
                                className="photo-remove-btn"
                                onClick={() => { setImagePreview(null); setImageData(""); fileInputRef.current.value = ""; }}
                            >
                                ✕ Remove photo
                            </button>
                        )}
                    </div>

                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? "Adding Property…" : "➕ Add Property"}
                    </button>
                </form>
            </div>
        </div>
    );
}