import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
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

            await API.post("/user/register", formData);

            alert("Registration Successful");

            navigate("/login");

        } catch (err) {

    console.log(err);

    alert(
        err.response?.data?.message ||
        err.message ||
        "Registration Failed"
    );

}

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    onChange={handleChange}
                >

                    <option value="user">Renter</option>

                    <option value="owner">Owner</option>

                </select>

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

        </div>

    );

}