import { useEffect, useState } from "react";
import API from "../../services/api";
import AllPropertiesCards from "./AllPropertiesCards";
import "./AllProperties.css";

export default function AllProperties() {
    const [properties, setProperties] = useState([]);
    const [searchLocation, setSearchLocation] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async (location = "") => {
        setLoading(true);
        try {
            const url = location ? `/owner/all-properties?location=${location}` : `/owner/all-properties`;
            const res = await API.get(url);
            setProperties(res.data.properties);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProperties(searchLocation);
    };

    return (
        <div className="all-properties-page">
            <div className="search-header">
                <h1>Find Your Perfect Home</h1>
                <p>Search through our exclusive collection of premium properties.</p>
                
                <form onSubmit={handleSearch} className="search-bar glass">
                    <input
                        type="text"
                        placeholder="Search by location (e.g. New York)"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn-primary search-btn">Search</button>
                </form>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", marginTop: "3rem" }}>Loading properties...</div>
            ) : (
                <div className="properties-container">
                    {properties.length > 0 ? (
                        properties.map((property) => (
                            <AllPropertiesCards
                                key={property._id}
                                property={property}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: "center", width: "100%", marginTop: "2rem" }}>
                            <h3>No properties found for this location.</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}