import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
        weight: "",
        height: "",
        gender: "",
        activityLevel: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/register",
                formData
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                <div className="auth-brand">
                    <h1>NutriAssist</h1>

                    <p>
                        Your personalized companion for a healthier
                        and more balanced lifestyle.
                    </p>

                    <p>
                        Understand your nutrition. Track your goals.
                        Build healthier habits.
                    </p>
                </div>

                <div className="auth-form-section">

                    <button
                        className="back-home"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Home
                    </button>

                    <h2>Create Account</h2>

                    <p className="auth-subtitle">
                        Start your personalized nutrition journey
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="username"
                            placeholder="Full Name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (kg)"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="height"
                            placeholder="Height (cm)"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>

                        <select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Activity Level
                            </option>

                            <option value="sedentary">
                                Sedentary
                            </option>

                            <option value="light">
                                Lightly Active
                            </option>

                            <option value="moderate">
                                Moderately Active
                            </option>

                            <option value="active">
                                Very Active
                            </option>

                            <option value="veryActive">
                                Extremely Active
                            </option>
                        </select>

                        <button type="submit">
                            Create Account
                        </button>

                    </form>

                    {message && (
                        <p className="auth-message">
                            {message}
                        </p>
                    )}

                    <p className="auth-switch">
                        Already have an account?

                        <button
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;