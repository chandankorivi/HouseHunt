import { useState } from "react";
import API from "../../../services/api";

export default function AddProperty() {

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        listingType: "rent",
        price: "",
        status: "available",
        description: "",
        image: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/owner/add-property", {
                title: formData.title,
                location: formData.location,
                listingType: formData.listingType,
                price: formData.price,
                status: formData.status,
                description: formData.description,
                images: [formData.image]
            });

            alert("Property Added Successfully");

            setFormData({
                title: "",
                location: "",
                listingType: "rent",
                price: "",
                status: "available",
                description: "",
                image: ""
            });

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

                <h2 style={{ textAlign: "center" }}>
                    Add Property
                </h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Property Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
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
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
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
                    name="description"
                    placeholder="Description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image Name (example: VillaVizag.jpg)"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="book-btn"
                >
                    Add Property
                </button>

            </form>

        </div>

    );

}