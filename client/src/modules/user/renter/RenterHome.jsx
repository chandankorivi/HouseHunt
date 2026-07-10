import { Link } from "react-router-dom";

export default function RenterHome() {
    return (
        <div className="dashboard-container animate-fade-in">
            <div className="dashboard-header">
                <h1>Renter Dashboard</h1>
                <p>Welcome! Browse properties and track your bookings from here.</p>
            </div>
            
            <div className="dashboard-grid">
                <div className="dashboard-card glass">
                    <h2>Explore Properties</h2>
                    <p>Find your dream home or next rental property.</p>
                    <Link to="/all-properties" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>
                        Browse Now
                    </Link>
                </div>
                
                <div className="dashboard-card glass">
                    <h2>My Bookings</h2>
                    <p>Track the status of properties you've requested to book.</p>
                    <Link to="/my-bookings" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>
                        View Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
}