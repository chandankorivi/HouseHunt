import { Link } from "react-router-dom";

export default function OwnerHome() {
    return (
        <div className="dashboard-container animate-fade-in">
            <div className="dashboard-header">
                <h1>Owner Dashboard</h1>
                <p>Welcome back! Manage your properties and review bookings from here.</p>
            </div>
            
            <div className="dashboard-grid">
                <div className="dashboard-card glass">
                    <h2>Add Property</h2>
                    <p>List a new property for sale or rent.</p>
                    <Link to="/add-property" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>
                        Add New
                    </Link>
                </div>
                
                <div className="dashboard-card glass">
                    <h2>My Properties</h2>
                    <p>View, edit, or delete your existing property listings.</p>
                    <Link to="/my-properties" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>
                        Manage Properties
                    </Link>
                </div>
                
                <div className="dashboard-card glass">
                    <h2>Bookings</h2>
                    <p>Review booking requests and approve or reject them.</p>
                    <Link to="/owner-bookings" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>
                        View Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
}