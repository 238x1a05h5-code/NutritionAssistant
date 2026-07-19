import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FoodTracker.css";

function FoodTracker() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        foodName: "",
        quantity: "",
        calories: "",
        protein: "",
        carbohydrates: "",
        fats: ""
    });

    const [foods, setFoods] = useState([]);
    const [message, setMessage] = useState("");

    const fetchFoods = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/food",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFoods(response.data.food);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch food records"
            );
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const addFood = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8000/api/food",
                {
                    foodName: formData.foodName,
                    quantity: Number(formData.quantity),
                    calories: Number(formData.calories),
                    protein: Number(formData.protein),
                    carbohydrates: Number(formData.carbohydrates),
                    fats: Number(formData.fats)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Food added successfully!");

            setFormData({
                foodName: "",
                quantity: "",
                calories: "",
                protein: "",
                carbohydrates: "",
                fats: ""
            });

            fetchFoods();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to add food"
            );
        }
    };

    const deleteFood = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/food/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Food deleted successfully!");

            fetchFoods();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete food"
            );
        }
    };

    const totalCalories = foods.reduce(
        (total, food) => total + Number(food.calories),
        0
    );

    const totalProtein = foods.reduce(
        (total, food) => total + Number(food.protein),
        0
    );

    const totalCarbohydrates = foods.reduce(
        (total, food) => total + Number(food.carbohydrates),
        0
    );

    const totalFats = foods.reduce(
        (total, food) => total + Number(food.fats),
        0
    );

    return (
        <div className="food-page">

            <nav className="food-navbar">

                <div className="food-logo">
                    Nutri<span>Assist</span>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </nav>

            <main className="food-content">

                <h1>Food Consumption Tracker</h1>

                <p className="food-subtitle">
                    Track what you eat and monitor your daily nutrition.
                </p>

                <section className="food-form-card">

                    <h2>Add Food</h2>

                    <form
                        className="food-form"
                        onSubmit={addFood}
                    >

                        <input
                            type="text"
                            name="foodName"
                            placeholder="Food Name"
                            value={formData.foodName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity (g)"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="calories"
                            placeholder="Calories"
                            value={formData.calories}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="protein"
                            placeholder="Protein (g)"
                            value={formData.protein}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="carbohydrates"
                            placeholder="Carbohydrates (g)"
                            value={formData.carbohydrates}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="fats"
                            placeholder="Fats (g)"
                            value={formData.fats}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            Add Food
                        </button>

                    </form>

                    {message && (
                        <p className="food-message">
                            {message}
                        </p>
                    )}

                </section>

                <section className="daily-summary">

                    <h2>Today's Nutrition Summary</h2>

                    <div className="summary-grid">

                        <div>
                            <strong>
                                {totalCalories.toFixed(1)}
                            </strong>
                            <span>Calories</span>
                        </div>

                        <div>
                            <strong>
                                {totalProtein.toFixed(1)}g
                            </strong>
                            <span>Protein</span>
                        </div>

                        <div>
                            <strong>
                                {totalCarbohydrates.toFixed(1)}g
                            </strong>
                            <span>Carbohydrates</span>
                        </div>

                        <div>
                            <strong>
                                {totalFats.toFixed(1)}g
                            </strong>
                            <span>Fats</span>
                        </div>

                    </div>

                </section>

                <section className="food-list-section">

                    <h2>Food Log</h2>

                    {foods.length === 0 ? (

                        <p className="empty-message">
                            No food items logged yet.
                        </p>

                    ) : (

                        <div className="food-list">

                            {foods.map((food) => (

                                <div
                                    className="food-item"
                                    key={food._id}
                                >

                                    <div className="food-info">

                                        <h3>
                                            {food.foodName}
                                        </h3>

                                        <p>
                                            Quantity: {food.quantity}g
                                        </p>

                                        <div className="food-nutrients">

                                            <span>
                                                🔥 {food.calories} kcal
                                            </span>

                                            <span>
                                                💪 {food.protein}g protein
                                            </span>

                                            <span>
                                                🌾 {food.carbohydrates}g carbs
                                            </span>

                                            <span>
                                                🥑 {food.fats}g fats
                                            </span>

                                        </div>

                                    </div>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteFood(food._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default FoodTracker;