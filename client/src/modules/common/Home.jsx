import { Link } from "react-router-dom";

export default function Home() {

    return (

        <div
            style={{
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg,#2563eb,#1e3a8a)",
                color: "white",
                textAlign: "center"
            }}
        >

            <div>

                <h1
                    style={{
                        fontSize: "60px",
                        marginBottom: "20px"
                    }}
                >
                    🏠 HouseHunt
                </h1>

                <h2
                    style={{
                        fontSize: "32px",
                        marginBottom: "15px"
                    }}
                >
                    Find Your Dream Home
                </h2>

                <p
                    style={{
                        fontSize: "20px",
                        marginBottom: "40px"
                    }}
                >
                    Buy • Rent • Sell Properties Easily
                </p>

                <Link to="/all-properties">

                    <button
                        style={{
                            padding: "15px 35px",
                            fontSize: "18px",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            background: "#FFD54F",
                            fontWeight: "bold"
                        }}
                    >
                        Explore Properties
                    </button>

                </Link>

            </div>

        </div>

    );

}