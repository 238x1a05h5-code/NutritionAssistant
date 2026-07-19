import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
console.log("NEW DASHBOARD CODE LOADED");
function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem("token");

    const [goal, setGoal] = useState("maintenance");
    const [suggestion, setSuggestion] = useState(null);
    const [message, setMessage] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const getSuggestion = async () => {
        try {
            setMessage("");

            const response = await axios.post(
                "http://localhost:8000/api/suggestions",
                {
                    goal,
                    age: user.age,
                    weight: user.weight,
                    height: user.height,
                    gender: user.gender,
                    activityLevel: user.activityLevel
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuggestion(
                response.data.suggestion
            );

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to get nutrition suggestion"
            );
        }
    };

    return (
        <div className="dashboard-page">

            {/* Navbar */}

            <nav className="dashboard-navbar">

    <div className="dashboard-logo">
        Nutri<span>Assist</span>
    </div>

    <button
        type="button"
        className="logout-btn"
        onClick={handleLogout}
    >
        Logout
    </button>

</nav>


            <main className="dashboard-content">

    {/* Welcome */}

    <section className="welcome-section">

        <h1>
            Welcome back, {user.username}! 👋
        </h1>

        <p>
            Let's work towards your health goals today.
        </p>

    </section>

    {/* Top Layout */}

    <div className="dashboard-top">

        {/* Profile Card */}

        <section className="profile-card">

            <h2>Your Profile</h2>

            <div className="profile-details">

                <div className="profile-item">
                    <span>Age</span>
                    <strong>{user.age} Years</strong>
                </div>

                <div className="profile-item">
                    <span>Weight</span>
                    <strong>{user.weight} kg</strong>
                </div>

                <div className="profile-item">
                    <span>Height</span>
                    <strong>{user.height} cm</strong>
                </div>

                <div className="profile-item">
                    <span>Activity</span>
                    <strong>{user.activityLevel}</strong>
                </div>

            </div>

        </section>

        {/* Goal Card */}

        <section className="goal-section">

            <h2>
                🎯 Select Your Goal
            </h2>

            <select
                value={goal}
                onChange={(e) =>
                    setGoal(e.target.value)
                }
            >

                <option value="weight loss">
                    Weight Loss
                </option>

                <option value="maintenance">
                    Maintain Weight
                </option>

                <option value="weight gain">
                    Weight Gain
                </option>

            </select>

            <div className="action-buttons">

                <button
                    className="generate-btn"
                    onClick={getSuggestion}
                >
                    🧮 Generate Plan
                </button>

                <button
                    className="generate-btn"
                    onClick={() =>
                        navigate("/food-tracker")
                    }
                >
                    🍎 Food Tracker
                </button>

                <button
                    className="generate-btn"
                    onClick={() =>
                        navigate("/diet-plans")
                    }
                >
                    🥗 Diet Plans
                </button>

                <button
                    className="generate-btn"
                    onClick={() =>
                        navigate("/progress")
                    }
                >
                    📊 Progress
                </button>

            </div>

            {message && (

                <p className="error-message">
                    {message}
                </p>

            )}

        </section>

    </div>

                {suggestion && (

    <>
        {/* Nutrition Overview */}

        <section className="nutrition-section">

            <h2>🥗 Your Nutrition Overview</h2>

            <div className="nutrition-grid">

                <div className="nutrition-card">
                    <h3>⚖ BMI</h3>
                    <strong>{suggestion.bmi}</strong>
                    <span>{suggestion.bmiCategory}</span>
                </div>

                <div className="nutrition-card">
                    <h3>🔥 Calories</h3>
                    <strong>{suggestion.dailyCalories}</strong>
                    <span>kcal / day</span>
                </div>

                <div className="nutrition-card">
                    <h3>💪 Protein</h3>
                    <strong>{suggestion.protein} g</strong>
                    <span>Daily Target</span>
                </div>

                <div className="nutrition-card">
                    <h3>🌾 Carbohydrates</h3>
                    <strong>{suggestion.carbohydrates} g</strong>
                    <span>Daily Target</span>
                </div>

                <div className="nutrition-card">
                    <h3>🥑 Fats</h3>
                    <strong>{suggestion.fats} g</strong>
                    <span>Daily Target</span>
                </div>

            </div>

        </section>

        {/* Recommendations */}

        <section className="recommendations-section">

            <h2>💡 Personalized Recommendations</h2>

            <ul>

                {suggestion.recommendations.map(
                    (recommendation, index) => (

                        <li key={index}>
                            {recommendation}
                        </li>

                    )
                )}

            </ul>

        </section>

    </>

)}

</main>

</div>
    );
}
export default Dashboard;