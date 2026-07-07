import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/user/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            if (res.data.role === "admin") {

                navigate("/admin");

            } else if (res.data.role === "owner") {

                navigate("/owner");

            } else {

                navigate("/renter");

            }

        } catch (err) {

            alert(err.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}