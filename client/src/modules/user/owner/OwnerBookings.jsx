import { useEffect, useState } from "react";
import API from "../../../services/api";
import { showToast } from "../../../components/Toast";
import "../RoleDashboard.css";

function statusColor(status) {
    if (status === "approved") return "#10b981";
    if (status === "rejected") return "#ef4444";
    return "#f59e0b";
}

export default function OwnerBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const res = await API.get("/booking/owner-bookings");
            setBookings(res.data.bookings);
        } catch (err) {
            showToast("Failed to load bookings", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await API.put(`/booking/update-booking/${id}`, { status });
            showToast(`Booking ${status} successfully!`, "success");
            fetchBookings();
        } catch (err) {
            showToast(err.response?.data?.message || "Failed to update booking status", "error");
        }
    };

    if (loading) return (
        <div className="role-page">
            <div className="rp-loading">
                <div className="rp-spinner" />
                <p>Loading bookings…</p>
            </div>
        </div>
    );

    return (
        <div className="role-page">
            <div className="rp-header" style={{ textAlign: "center" }}>
                <h1>📋 Manage Bookings</h1>
                <p>Review and approve or reject booking requests for your properties.</p>
            </div>

            <div className="form-glass-card" style={{ maxWidth: "100%" }}>
                {bookings.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.45)" }}>
                        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
                        <p>No bookings yet for your properties.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table className="owner-booking-table">
                            <thead>
                                <tr>
                                    <th>Owner ID</th>
                                    <th>Property ID</th>
                                    <th>Tenant ID</th>
                                    <th>Tenant Name</th>
                                    <th>Tenant Contact</th>
                                    <th>Booking Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(b => (
                                    <tr key={b._id}>
                                        <td>
                                            <span className="id-chip id-chip-full">
                                                {b.property?.owner || "—"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="id-chip id-chip-full id-chip-accent">
                                                {b.property?._id || "—"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="id-chip id-chip-full">
                                                {b.user?._id || "—"}
                                            </span>
                                        </td>
                                        <td style={{ color: "#fff", fontWeight: 600 }}>
                                            {b.user?.name || "—"}
                                        </td>
                                        <td>{b.user?.mobile || "—"}</td>
                                        <td>
                                            <span style={{
                                                color: statusColor(b.status),
                                                fontWeight: 700,
                                                textTransform: "capitalize"
                                            }}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td>
                                            {b.status === "pending" ? (
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <button
                                                        className="rp-approve-btn"
                                                        onClick={() => handleUpdateStatus(b._id, "approved")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="rp-reject-btn"
                                                        onClick={() => handleUpdateStatus(b._id, "rejected")}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>—</span>
                                            )}
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