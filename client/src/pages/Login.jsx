import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                <div className="auth-brand">
                    <h1>NutriAssist</h1>

                    <p>
                        Welcome back to your personalized nutrition
                        journey.
                    </p>

                    <p>
                        Continue making healthier choices, tracking
                        your progress, and reaching your goals.
                    </p>
                </div>

                <div className="auth-form-section">

                    <button
                        className="back-home"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Home
                    </button>

                    <h2>Welcome Back</h2>

                    <p className="auth-subtitle">
                        Login to access your nutrition dashboard
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button type="submit">
                            Login
                        </button>

                    </form>

                    {message && (
                        <p className="auth-message">
                            {message}
                        </p>
                    )}

                    <p className="auth-switch">
                        Don't have an account?

                        <button
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;