import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import { showToast } from "../../components/Toast";
import "./AdminDashboard.css";

const TABS = [
    { key: "users",      label: "All Users",      icon: "👥" },
    { key: "properties", label: "All Properties", icon: "🏠" },
    { key: "bookings",   label: "All Bookings",   icon: "📋" },
];

function shortId(id) {
    return id ? id.toString().slice(-8) : "—";
}

function typeBadge(role) {
    const map = { admin: "admin", owner: "owner", user: "renter" };
    const label = map[role] || role;
    return <span className={`badge badge-${label}`}>{label}</span>;
}

function grantBadge(status) {
    return <span className={`badge badge-${status}`}>{status}</span>;
}

function statusBadge(status) {
    const cls = status?.toLowerCase().replace("/", "");
    return <span className={`badge badge-${cls}`}>{status}</span>;
}

function propTypeBadge(type) {
    const cls = type === "plot/land" ? "plot" : type;
    return <span className={`badge badge-${cls}`}>{type}</span>;
}

function listBadge(type) {
    return <span className={`badge badge-${type}`}>{type}</span>;
}

export default function AdminHome() {
    const [activeTab, setActiveTab] = useState("users");
    const [users,      setUsers]      = useState([]);
    const [properties, setProperties] = useState([]);
    const [bookings,   setBookings]   = useState([]);
    const [loading,    setLoading]    = useState(false);

    /* ── Fetch helpers ─────────────────────────────────────────── */
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await API.get("/admin/users");
            setUsers(res.data.users_info);
        } catch { showToast("Failed to load users", "error"); }
        finally { setLoading(false); }
    }, []);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const res = await API.get("/admin/properties");
            setProperties(res.data.properties_info);
        } catch { showToast("Failed to load properties", "error"); }
        finally { setLoading(false); }
    }, []);

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await API.get("/admin/bookings");
            setBookings(res.data.bookings_info);
        } catch { showToast("Failed to load bookings", "error"); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => {
        if (activeTab === "users")      fetchUsers();
        if (activeTab === "properties") fetchProperties();
        if (activeTab === "bookings")   fetchBookings();
    }, [activeTab, fetchUsers, fetchProperties, fetchBookings]);

    /* ── Actions ───────────────────────────────────────────────── */
    const handleGrant = async (userId) => {
        try {
            await API.put(`/admin/grant-owner/${userId}`);
            showToast("Owner granted successfully ✅", "success");
            fetchUsers();
        } catch { showToast("Failed to grant owner", "error"); }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            await API.delete(`/admin/user/${id}`);
            showToast("User deleted", "success");
            fetchUsers();
        } catch { showToast("Failed to delete user", "error"); }
    };

    const handleDeleteProperty = async (id) => {
        if (!window.confirm("Delete this property?")) return;
        try {
            await API.delete(`/admin/property/${id}`);
            showToast("Property deleted", "success");
            fetchProperties();
        } catch { showToast("Failed to delete property", "error"); }
    };

    /* ── Stats ─────────────────────────────────────────────────── */
    const stats = [
        { icon: "👥", number: users.length,      label: "Total Users"  },
        { icon: "🏠", number: properties.length, label: "Properties"   },
        { icon: "📋", number: bookings.length,   label: "Bookings"     },
        { icon: "🔑", number: users.filter(u => u.role === "owner" && u.grantStatus === "pending").length, label: "Pending Grants" },
    ];

    /* ── Renderers ─────────────────────────────────────────────── */
    const renderLoader = () => (
        <div className="table-loading">
            <div className="table-loading-spinner" />
            <p>Loading data…</p>
        </div>
    );

    const renderEmpty = (msg) => (
        <div className="table-empty">
            <div className="table-empty-icon">📭</div>
            <p>{msg}</p>
        </div>
    );

    const renderUsers = () => {
        if (loading) return renderLoader();
        if (!users.length) return renderEmpty("No users found");
        return (
            <div className="table-scroll">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Type</th>
                            <th>Grant Request</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td><span className="id-chip">{shortId(u._id)}</span></td>
                                <td style={{ color: "#fff", fontWeight: 600 }}>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.mobile || "—"}</td>
                                <td>{typeBadge(u.role)}</td>
                                <td>
                                    {u.role === "owner"
                                        ? grantBadge(u.grantStatus || "pending")
                                        : <span style={{ color: "rgba(255,255,255,0.25)" }}>N/A</span>
                                    }
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        {u.role === "owner" && u.grantStatus === "pending" && (
                                            <button
                                                className="grant-btn"
                                                onClick={() => handleGrant(u._id)}
                                            >
                                                Grant
                                            </button>
                                        )}
                                        {u.role !== "admin" && (
                                            <button
                                                className="action-btn action-btn-danger"
                                                onClick={() => handleDeleteUser(u._id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderProperties = () => {
        if (loading) return renderLoader();
        if (!properties.length) return renderEmpty("No properties found");
        return (
            <div className="table-scroll">
                <table className="admin-table">
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(p => (
                            <tr key={p._id}>
                                <td><span className="id-chip">{shortId(p._id)}</span></td>
                                <td style={{ color: "#fff", fontWeight: 600 }}>{p.title}</td>
                                <td>{propTypeBadge(p.propertyType || "residential")}</td>
                                <td>{listBadge(p.listingType)}</td>
                                <td>{p.location}</td>
                                <td>{p.ownerContact || p.owner?.mobile || "—"}</td>
                                <td style={{ color: "#a78bfa", fontWeight: 700 }}>
                                    {Number(p.price).toLocaleString("en-IN")}
                                </td>
                                <td>{statusBadge(p.status)}</td>
                                <td>
                                    <button
                                        className="action-btn action-btn-danger"
                                        onClick={() => handleDeleteProperty(p._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderBookings = () => {
        if (loading) return renderLoader();
        if (!bookings.length) return renderEmpty("No bookings found");
        return (
            <div className="table-scroll">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Owner ID</th>
                            <th>Property ID</th>
                            <th>Tenant ID</th>
                            <th>Tenant Name</th>
                            <th>Tenant Contact</th>
                            <th>Booking Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b._id}>
                                <td><span className="id-chip id-chip-full">{b.property?.owner?._id || "—"}</span></td>
                                <td><span className="id-chip id-chip-full id-chip-accent">{b.property?._id || "—"}</span></td>
                                <td><span className="id-chip id-chip-full">{b.user?._id || "—"}</span></td>
                                <td style={{ color: "#fff", fontWeight: 600 }}>{b.user?.name || "—"}</td>
                                <td>{b.user?.mobile || "—"}</td>
                                <td>{statusBadge(b.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const tabCount = { users: users.length, properties: properties.length, bookings: bookings.length };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <h1>🛡️ Admin Dashboard</h1>
                <p>Full system overview — manage users, properties & bookings</p>
            </div>

            {/* Stats */}
            <div className="admin-stats">
                {stats.map(s => (
                    <div className="stat-card" key={s.label}>
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-number">{s.number}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                {TABS.map(t => (
                    <button
                        key={t.key}
                        className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
                        onClick={() => setActiveTab(t.key)}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* Table Panel */}
            <div className="table-panel">
                <div className="table-panel-header">
                    <h2>{TABS.find(t => t.key === activeTab)?.icon} {TABS.find(t => t.key === activeTab)?.label}</h2>
                    <span className="table-count-badge">{tabCount[activeTab]} records</span>
                </div>
                {activeTab === "users"      && renderUsers()}
                {activeTab === "properties" && renderProperties()}
                {activeTab === "bookings"   && renderBookings()}
            </div>
        </div>
    );
}