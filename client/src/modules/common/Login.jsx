import { useState } from "react";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async(e)=>{

        e.preventDefault();

        try{

            const res=await API.post("/user/login",{
                email,
                password
            });

            localStorage.setItem("token",res.data.token);
            localStorage.setItem("role",res.data.role);

            if(res.data.role==="admin"){

                navigate("/admin");

            }
            else if(res.data.role==="owner"){

                navigate("/owner");

            }
            else{

                navigate("/renter");

            }

        }
        catch(err){

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return(

        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    HouseHunt
                </h1>

                <p className="login-subtitle">
                    Welcome Back 👋
                </p>

                <form onSubmit={handleLogin}>

                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}