import { useEffect, useState } from "react";
import API from "../../services/api";
import AllPropertiesCards from "./AllPropertiesCards";

export default function AllProperties() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await API.get("/user/all-properties");
            setProperties(res.data.properties);
        } catch (err) {
            console.log(err);
        }
    };

   return (

    <div>

        <h1
            style={{
                textAlign: "center",
                marginTop: "30px"
            }}
        >
            All Properties
        </h1>

        <div className="properties-container">

            {properties.map((property) => (

                <AllPropertiesCards
                    key={property._id}
                    property={property}
                />

            ))}

        </div>

    </div>

);
}