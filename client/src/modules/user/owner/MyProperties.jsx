import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { showToast } from "../../../components/Toast";
import "../RoleDashboard.css";

function shortId(id) { return id ? id.toString().slice(-8) : "—"; }

function badge(val, type) {
    const map = {
        available: "rp-available", sold: "rp-sold", rented: "rp-sold",
        rent: "rp-rent", sale: "rp-sale",
        residential: "rp-residential", commercial: "rp-commercial",
        "plot/land": "rp-plotland"
    };
    return <span className={`rp-badge ${map[val] || ""}`}>{val}</span>;
}

export default function MyProperties() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("all");

    useEffect(() => { fetchProperties(); }, []);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const res = await API.get("/owner/my-properties");
            setProperties(res.data.properties);
        } catch {
            showToast("Failed to load properties", "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteProperty = async (id) => {
        if (!window.confirm("Delete this property? This cannot be undone.")) return;
        try {
            await API.delete(`/owner/delete-property/${id}`);
            showToast("Property deleted", "success");
            fetchProperties();
        } catch (err) {
            showToast(err.response?.data?.message || "Delete failed", "error");
        }
    };

    const filtered = filterType === "all"
        ? properties
        : properties.filter(p => p.status === filterType);

    return (
        <div className="role-page">
            <div className="rp-header">
                <h1>🏠 My Properties</h1>
                <p>View, edit and manage all your property listings</p>
            </div>

            {/* Filter bar */}
            <div className="filter-bar">
                {["all", "available", "sold", "rented"].map(f => (
                    <button
                        key={f}
                        className="filter-select"
                        style={{
                            cursor: "pointer",
                            background: filterType === f ? "rgba(129,140,248,0.25)" : "rgba(255,255,255,0.07)",
                            color: filterType === f ? "#818cf8" : "rgba(255,255,255,0.6)",
                            border: filterType === f ? "1px solid rgba(129,140,248,0.4)" : "1px solid rgba(255,255,255,0.12)"
                        }}
                        onClick={() => setFilterType(f)}
                    >
                        {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
                <button
                    className="submit-btn"
                    style={{ width: "auto", padding: "0.5rem 1.25rem", marginTop: 0 }}
                    onClick={() => navigate("/add-property")}
                >
                    + Add Property
                </button>
            </div>

            <div className="rp-table-panel">
                <div className="rp-table-header">
                    <h2>📋 Property Listings</h2>
                    <span className="rp-count-badge">{filtered.length} properties</span>
                </div>

                {loading ? (
                    <div className="rp-loading">
                        <div className="rp-spinner" />
                        <p>Loading your properties…</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rp-empty">
                        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏗️</div>
                        <p>No properties found. Start by adding one!</p>
                    </div>
                ) : (
                    <div className="rp-table-scroll">
                        <table className="rp-table">
                            <thead>
                                <tr>
                                    <th>Property ID</th>
                                    <th>Title</th>
                                    <th>Property Type</th>
                                    <th>AD Type</th>
                                    <th>Address</th>
                                    <th>Owner Contact</th>
                                    <th>Amount (₹)</th>
                                    <th>Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p._id}>
                                        <td><span className="rp-id">{shortId(p._id)}</span></td>
                                        <td style={{ color: "#fff", fontWeight: 600 }}>{p.title}</td>
                                        <td>{badge(p.propertyType || "residential", "type")}</td>
                                        <td>{badge(p.listingType, "listing")}</td>
                                        <td>{p.location}</td>
                                        <td>{p.ownerContact || "—"}</td>
                                        <td style={{ color: "#818cf8", fontWeight: 700 }}>
                                            ₹{Number(p.price).toLocaleString("en-IN")}
                                        </td>
                                        <td>{badge(p.status, "status")}</td>
                                        <td>
                                            <div style={{ display: "flex", gap: "0.4rem" }}>
                                                <button
                                                    className="rp-edit-btn"
                                                    onClick={() => navigate(`/edit-property/${p._id}`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="rp-del-btn"
                                                    onClick={() => deleteProperty(p._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}