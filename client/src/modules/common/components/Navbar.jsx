import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                🏠 HouseHunt
            </div>

            <ul className="nav-links">

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/all-properties">Properties</Link>
                </li>

                <li>
                    <Link to="/my-properties">My Properties</Link>
                </li>

                <li>
                    <Link to="/my-bookings">Bookings</Link>
                </li>

                <li>
                    <Link to="/login">Logout</Link>
                </li>

            </ul>

        </nav>

    );

}