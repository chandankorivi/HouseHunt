import API from "../../services/api";

export default function AllPropertiesCards({ property }) {

    const handleBooking = async () => {

        try {

            const res = await API.post(
                `/booking/book-property/${property._id}`
            );

            alert(res.data.message);

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Booking Failed"
            );

        }

    };

    return (

        <div className="property-card">

            <img
                src={`/images/${property.images[0]}`}
                alt={property.title}
                className="property-image"
            />

            <div className="property-content">

                <h2 className="property-title">
                    🏠 {property.title}
                </h2>

                <p className="property-info">
                    📍 {property.location}
                </p>

                <p className="property-info">
                    💰 ₹{property.price}
                </p>

                <p className="property-info">
                    🏷 {property.listingType}
                </p>

                <p className="property-info">
                    ✅ {property.status}
                </p>

                <p className="property-info">
                    {property.description}
                </p>

                <button
                    className="book-btn"
                    onClick={handleBooking}
                >
                    Book Property
                </button>

            </div>

        </div>

    );

}