import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {

        try {

            const res = await API.get("/booking/my-bookings");

            setBookings(res.data.bookings);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>My Bookings</h1>

            {

                bookings.map((booking) => (

                    <div
                        key={booking._id}
                        style={{
                            border: "1px solid black",
                            margin: "20px",
                            padding: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <h3>{booking.property.title}</h3>

                        <p>Location : {booking.property.location}</p>

                        <p>Status : {booking.status}</p>

                    </div>

                ))

            }

        </div>

    );

}