import "./DietPlans.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DietPlans() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [plans, setPlans] = useState([]);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        planName: "",
        goal: "weight loss",
        startDate: "",
        endDate: "",
        dietaryPreference: "",
        restrictions: "",
        notes: ""
    });

    const fetchPlans = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/diet-plans",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPlans(response.data.dietPlans);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch diet plans"
            );
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createPlan = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8000/api/diet-plans",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("✅ Diet plan created successfully!");

            setFormData({
                planName: "",
                goal: "weight loss",
                startDate: "",
                endDate: "",
                dietaryPreference: "",
                restrictions: "",
                notes: ""
            });

            fetchPlans();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create diet plan"
            );
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:8000/api/diet-plans/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchPlans();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to update plan"
            );
        }
    };

    const deletePlan = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/diet-plans/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Diet plan deleted successfully!");

            fetchPlans();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete plan"
            );
        }
    };

    return (
        <div className="diet-page">

            {/* Navbar */}

            <nav className="diet-navbar">

                <div
                    className="diet-logo"
                    onClick={() => navigate("/dashboard")}
                >
                    Nutri<span>Assist</span>
                </div>

                <button
                    className="dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </nav>

            <main className="diet-content">

    <section className="diet-header">
        <h1>🥗 My Diet Plans</h1>

        <p>
            Create and manage personalized nutrition plans
            to stay on track with your health goals.
        </p>
    </section>

    <div className="diet-layout">

        {/* LEFT SIDE */}
        <section className="diet-form-card">

            <h2>Create New Diet Plan</h2>

            <form className="diet-form" onSubmit={createPlan}>

                <div className="form-group">
                    <label>Plan Name</label>
                    <input
                        type="text"
                        name="planName"
                        value={formData.planName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Goal</label>

                    <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                    >
                        <option value="weight loss">Weight Loss</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="weight gain">Weight Gain</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Start Date</label>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>End Date</label>

                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Diet Preference</label>

                    <input
                        type="text"
                        name="dietaryPreference"
                        value={formData.dietaryPreference}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Restrictions</label>

                    <input
                        type="text"
                        name="restrictions"
                        value={formData.restrictions}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Notes</label>

                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <button className="create-plan-btn">
                    Create Diet Plan
                </button>

            </form>

            {message && (
                <p className="success-message">{message}</p>
            )}

        </section>

        {/* RIGHT SIDE */}
        <section className="plans-section">

            <div className="section-title">

                <h2>Your Diet Plans</h2>

                <span>{plans.length} Plans</span>

            </div>

            {plans.length === 0 ? (

                <div className="no-plans">

                    No Diet Plans Found

                </div>

            ) : (

                <div className="plans-list">

                    {plans.map((plan) => (

                        <div className="plan-card" key={plan._id}>

                            <h3>{plan.planName}</h3>

                            <span
                                className={
                                    plan.status === "active"
                                        ? "status-badge status-active"
                                        : "status-badge status-completed"
                                }
                            >
                                {plan.status}
                            </span>

                            <p><strong>🎯 Goal:</strong> {plan.goal}</p>

                            <p>
                                <strong>📅 Duration:</strong><br />
                                {new Date(plan.startDate).toLocaleDateString()}
                                {" - "}
                                {new Date(plan.endDate).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>🥦 Preference:</strong>
                                {" "}
                                {plan.dietaryPreference || "-"}
                            </p>

                            <p>
                                <strong>🚫 Restrictions:</strong>
                                {" "}
                                {plan.restrictions || "-"}
                            </p>

                            <p>
                                <strong>📝 Notes:</strong><br />
                                {plan.notes || "No Notes"}
                            </p>

                            <div className="plan-actions">

                                {plan.status === "active" && (

                                    <button
                                        className="complete-btn"
                                        onClick={() =>
                                            updateStatus(plan._id, "completed")
                                        }
                                    >
                                        Complete
                                    </button>

                                )}

                                <button
                                    className="delete-plan-btn"
                                    onClick={() => deletePlan(plan._id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    </div>

</main>


        </div>
    );
}

export default DietPlans;