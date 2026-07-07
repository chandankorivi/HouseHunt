import { useEffect, useState } from "react";
import API from "../../../services/api";
import AllPropertiesCards from "../AllPropertiesCards";

export default function RenterHome() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {

        fetchProperties();

    }, []);

    const fetchProperties = async () => {

        try {

            const res = await API.get("/owner/all-properties");

            setProperties(res.data.properties);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Available Properties</h1>

            <button
    onClick={() => window.location.href = "/my-bookings"}
>
    My Bookings
</button>

<br /><br />

            {

                properties.map((property) => (

                    <AllPropertiesCards
                        key={property._id}
                        property={property}
                    />

                ))

            }

        </div>

    );

}