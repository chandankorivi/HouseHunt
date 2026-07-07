import { Link } from "react-router-dom";

export default function OwnerHome() {

    return (

        <div
            style={{
                padding: "40px",
                background: "#f4f6f9",
                minHeight: "100vh"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "40px"
                }}
            >
                🏠 Owner Dashboard
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                    gap: "30px"
                }}
            >

                <Link
                    to="/add-property"
                    style={{ textDecoration: "none" }}
                >
                    <div className="dashboard-card">

                        <h2>➕ Add Property</h2>

                        <p>Create a new property listing.</p>

                    </div>
                </Link>

                <Link
                    to="/my-properties"
                    style={{ textDecoration: "none" }}
                >
                    <div className="dashboard-card">

                        <h2>🏡 My Properties</h2>

                        <p>View all your listed properties.</p>

                    </div>
                </Link>

                <Link
                    to="/owner-bookings"
                    style={{ textDecoration: "none" }}
                >
                    <div className="dashboard-card">

                        <h2>📋 Booking Requests</h2>

                        <p>Approve or reject bookings.</p>

                    </div>
                </Link>

            </div>

        </div>

    );

}