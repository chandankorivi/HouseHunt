import { useEffect, useState } from "react";
import API from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await API.get("/booking/my-bookings");
            setBookings(res.data.bookings);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: "30px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
            <h1 style={{ marginBottom: "20px" }}>My Bookings</h1>

            <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px" }}>
                {bookings.length > 0 ? (
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ background: "#5b36ff", color: "white" }}>
                                <th style={{ padding: "12px 15px", borderRadius: "8px 0 0 8px" }}>Booking ID</th>
                                <th style={{ padding: "12px 15px" }}>Property ID</th>
                                <th style={{ padding: "12px 15px" }}>Tenant Name</th>
                                <th style={{ padding: "12px 15px" }}>Phone</th>
                                <th style={{ padding: "12px 15px", borderRadius: "0 8px 8px 0" }}>Booking Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} style={{ borderBottom: "1px solid #334155" }}>
                                    <td style={{ padding: "12px 15px", color: "#cbd5e1" }}>{booking._id}</td>
                                    <td style={{ padding: "12px 15px", color: "#cbd5e1" }}>{booking.property?._id}</td>
                                    <td style={{ padding: "12px 15px", color: "#cbd5e1" }}>{user?.name || "N/A"}</td>
                                    <td style={{ padding: "12px 15px", color: "#cbd5e1" }}>{user?.mobile || "N/A"}</td>
                                    <td style={{ padding: "12px 15px", fontWeight: "bold", color: booking.status === 'rejected' ? '#ef4444' : booking.status === 'approved' ? '#10b981' : '#f59e0b' }}>
                                        {booking.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{textAlign: 'center', padding: '3rem'}}>
                        <h3>No Bookings yet done</h3>
                    </div>
                )}
            </div>
        </div>
    );
}