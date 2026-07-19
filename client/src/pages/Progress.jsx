import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Progress.css";

function Progress() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [foods, setFoods] = useState([]);
    const [plans, setPlans] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const foodResponse = await axios.get(
                "http://localhost:8000/api/food",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const planResponse = await axios.get(
                "http://localhost:8000/api/diet-plans",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFoods(foodResponse.data.food || []);
            setPlans(planResponse.data.dietPlans || []);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to load progress data"
            );
        }
    };

    const totalCalories = foods.reduce(
        (total, food) => total + Number(food.calories || 0),
        0
    );

    const totalProtein = foods.reduce(
        (total, food) => total + Number(food.protein || 0),
        0
    );

    const totalCarbohydrates = foods.reduce(
        (total, food) => total + Number(food.carbohydrates || 0),
        0
    );

    const totalFats = foods.reduce(
        (total, food) => total + Number(food.fats || 0),
        0
    );

    const activePlans = plans.filter(
        (plan) => plan.status === "active"
    );

    return (
        <div className="progress-page">

            {/* Navbar */}

            <nav className="progress-navbar">

                <div className="progress-logo">
                    Nutri<span>Assist</span>
                </div>

                <button onClick={() => navigate("/dashboard")}>
                    ← Dashboard
                </button>

            </nav>

            <main className="progress-content">

                {/* Header */}

                <div className="progress-header">

                    <h1>📊 Progress & Reports</h1>

                    <p className="progress-subtitle">
                        Monitor your nutrition, food intake and diet plan progress.
                    </p>

                    {message && (
                        <p className="progress-message">
                            {message}
                        </p>
                    )}

                </div>

                {/* Statistics */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <span className="stat-icon">🔥</span>

                        <h3>{totalCalories.toFixed(1)}</h3>

                        <p>Total Calories</p>

                    </div>

                    <div className="stat-card">

                        <span className="stat-icon">💪</span>

                        <h3>{totalProtein.toFixed(1)}g</h3>

                        <p>Total Protein</p>

                    </div>

                    <div className="stat-card">

                        <span className="stat-icon">🌾</span>

                        <h3>{totalCarbohydrates.toFixed(1)}g</h3>

                        <p>Carbohydrates</p>

                    </div>

                    <div className="stat-card">

                        <span className="stat-icon">🥑</span>

                        <h3>{totalFats.toFixed(1)}g</h3>

                        <p>Total Fats</p>

                    </div>

                </section>

                {/* Two Column Layout */}

                <div className="progress-layout">

                    {/* LEFT PANEL */}

                    <div className="left-panel">

                        <section className="report-card">

                            <h2>Nutrition Overview</h2>

                            <div className="nutrition-bars">

                                <div className="nutrition-row">

                                    <div className="nutrition-label">

                                        <span>Calories</span>

                                        <strong>
                                            {totalCalories.toFixed(1)} kcal
                                        </strong>

                                    </div>

                                    <div className="bar-container">

                                        <div
                                            className="bar calories-bar"
                                            style={{
                                                width: `${Math.min(
                                                    totalCalories / 30,
                                                    100
                                                )}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                                <div className="nutrition-row">

                                    <div className="nutrition-label">

                                        <span>Protein</span>

                                        <strong>
                                            {totalProtein.toFixed(1)} g
                                        </strong>

                                    </div>

                                    <div className="bar-container">

                                        <div
                                            className="bar protein-bar"
                                            style={{
                                                width: `${Math.min(
                                                    totalProtein,
                                                    100
                                                )}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                                <div className="nutrition-row">

                                    <div className="nutrition-label">

                                        <span>Carbohydrates</span>

                                        <strong>
                                            {totalCarbohydrates.toFixed(1)} g
                                        </strong>

                                    </div>

                                    <div className="bar-container">

                                        <div
                                            className="bar carbs-bar"
                                            style={{
                                                width: `${Math.min(
                                                    totalCarbohydrates / 5,
                                                    100
                                                )}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>
                                                                <div className="nutrition-row">

                                    <div className="nutrition-label">

                                        <span>Fats</span>

                                        <strong>
                                            {totalFats.toFixed(1)} g
                                        </strong>

                                    </div>

                                    <div className="bar-container">

                                        <div
                                            className="bar fats-bar"
                                            style={{
                                                width: `${Math.min(
                                                    totalFats,
                                                    100
                                                )}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            </div>

                        </section>

                        <section className="progress-summary">

                            <div className="summary-card">

                                <h2>🍽 Food Tracking</h2>

                                <p>
                                    You have logged
                                    <strong> {foods.length} </strong>
                                    food item(s).
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/food-tracker")
                                    }
                                >
                                    View Food Tracker
                                </button>

                            </div>

                            <div className="summary-card">

                                <h2>🥗 Diet Plans</h2>

                                <p>
                                    You currently have
                                    <strong> {activePlans.length} </strong>
                                    active diet plan(s).
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/diet-plans")
                                    }
                                >
                                    View Diet Plans
                                </button>

                            </div>

                        </section>

                    </div>

                    {/* RIGHT PANEL */}

                    <div className="right-panel">

                        <section className="tips-card">

                            <h2>💡 Healthy Nutrition Tips</h2>

                            <ul>

                                <li>
                                    💧 Drink at least 2–3 liters of water every day.
                                </li>

                                <li>
                                    🥗 Eat more vegetables and fruits in every meal.
                                </li>

                                <li>
                                    🌾 Choose whole grains instead of refined grains.
                                </li>

                                <li>
                                    💪 Include enough protein in your daily diet.
                                </li>

                                <li>
                                    🚫 Reduce sugary drinks and processed foods.
                                </li>

                                <li>
                                    🏃 Exercise for at least 30 minutes daily.
                                </li>

                                <li>
                                    😴 Get 7–8 hours of quality sleep.
                                </li>

                            </ul>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Progress;