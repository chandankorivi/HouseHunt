import { useEffect, useState } from "react";
import API from "../../../services/api";
import AllPropertiesCards from "../AllPropertiesCards";

export default function MyProperties() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {

        const res = await API.get("/owner/my-properties");

        setProperties(res.data.properties);

    };

    const deleteProperty = async (id) => {

        if (!window.confirm("Delete this property?"))
            return;

        await API.delete(`/owner/delete-property/${id}`);

        fetchProperties();

    };

    return (

        <div className="properties-container">

            {properties.map((property) => (

                <div key={property._id}>

                   <>
    <AllPropertiesCards property={property} />

    <button
        className="book-btn"
        onClick={() =>
            window.location.href = `/edit-property/${property._id}`
        }
    >
        Edit Property
    </button>

    <button
        className="delete-btn"
        onClick={() => deleteProperty(property._id)}
    >
        Delete Property
    </button>
</>

                    <button
                        className="delete-btn"
                        onClick={() => deleteProperty(property._id)}
                    >
                        Delete Property
                    </button>

                </div>

            ))}

        </div>

    );

}