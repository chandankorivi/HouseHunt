import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../services/api";

export default function EditProperty() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        listingType: "rent",
        price: "",
        status: "available",
        description: "",
        image: ""
    });

    useEffect(() => {
        fetchProperty();
    }, []);

    const fetchProperty = async () => {

        try {

            const res = await API.get(`/owner/property/${id}`);

            const property = res.data.property;

            setFormData({
                title: property.title,
                location: property.location,
                listingType: property.listingType,
                price: property.price,
                status: property.status,
                description: property.description,
                image: property.images[0]
            });

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/owner/update-property/${id}`, {

                title: formData.title,
                location: formData.location,
                listingType: formData.listingType,
                price: formData.price,
                status: formData.status,
                description: formData.description,
                images: [formData.image]

            });

            alert("Property Updated Successfully");

            navigate("/my-properties");

        } catch (err) {

            alert(err.response?.data?.message || "Error");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px"
            }}
        >

            <form
                onSubmit={handleSubmit}
                style={{
                    width: "450px",
                    background: "white",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,.15)"
                }}
            >

                <h2>Edit Property</h2>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleChange}
                >
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                </select>

                <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>

                <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image Name"
                />

                <button
                    type="submit"
                    className="book-btn"
                >
                    Update Property
                </button>

            </form>

        </div>

    );

}