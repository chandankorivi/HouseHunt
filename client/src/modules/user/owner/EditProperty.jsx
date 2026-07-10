import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../services/api";
import { showToast } from "../../../components/Toast";
import "../RoleDashboard.css";

const PROPERTY_TYPES = ["residential", "commercial", "plot/land"];
const LISTING_TYPES  = ["rent", "sale"];
const STATUS_OPTS    = ["available", "sold"];

export default function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading]       = useState(false);
    const [fetching, setFetching]     = useState(true);
    const [imagePreview, setImagePreview] = useState(null);  // shown in UI
    const [imageData, setImageData]       = useState("");    // sent to server (data URL or existing URL)
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

    useEffect(() => { fetchProperty(); }, []);

    const fetchProperty = async () => {
        try {
            const res = await API.get(`/owner/property/${id}`);
            const p = res.data.property;
            setFormData({
                title: p.title,
                location: p.location,
                propertyType: p.propertyType || "residential",
                listingType: p.listingType,
                price: p.price,
                status: p.status,
                description: p.description,
                ownerContact: p.ownerContact || ""
            });
            // Pre-load existing image (could be data URL or a filename string)
            const existing = p.images?.[0] || "";
            setImagePreview(existing);
            setImageData(existing);
        } catch {
            showToast("Failed to load property", "error");
        } finally {
            setFetching(false);
        }
    };

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
        setLoading(true);
        try {
            await API.put(`/owner/update-property/${id}`, {
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
            showToast("Property updated successfully ✅", "success");
            setTimeout(() => navigate("/my-properties"), 900);
        } catch (err) {
            showToast(err.response?.data?.message || "Update failed", "error");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="role-page">
            <div className="rp-loading">
                <div className="rp-spinner" />
                <p>Loading property…</p>
            </div>
        </div>
    );

    return (
        <div className="role-page">
            <div className="rp-header" style={{ textAlign: "center" }}>
                <h1>✏️ Edit Property</h1>
                <p>Update your property listing details</p>
            </div>

            <div className="form-glass-card">
                <form onSubmit={handleSubmit} noValidate>

                    <div className="fg">
                        <label>Property Title *</label>
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Property Title" required />
                    </div>

                    <div className="fg">
                        <label>Address / Location *</label>
                        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    </div>

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

                    <div className="form-row">
                        <div className="fg">
                            <label>Amount (₹) *</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />
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

                    <div className="fg">
                        <label>Owner Contact Number</label>
                        <input name="ownerContact" value={formData.ownerContact} onChange={handleChange} maxLength={10} placeholder="e.g. 9876543210" />
                    </div>

                    <div className="fg">
                        <label>Description</label>
                        <textarea name="description" rows={4} value={formData.description} onChange={handleChange} />
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
                            id="editPropertyPhotoInput"
                        />

                        {/* Custom upload box */}
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
                                onClick={() => { setImagePreview(null); setImageData(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                            >
                                ✕ Remove photo
                            </button>
                        )}
                    </div>

                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? "Updating…" : "💾 Update Property"}
                    </button>
                </form>
            </div>
        </div>
    );
}