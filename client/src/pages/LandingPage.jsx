import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">

            <nav className="navbar">
                <div className="logo">
                    Nutri<span>Assist</span>
                </div>

                <div className="nav-buttons">
                    <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="signup-btn"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            <section className="hero-section">

                <div className="hero-content">
                    <p className="small-heading">
                        YOUR PERSONAL NUTRITION COMPANION
                    </p>

                    <h1>
                        Eat Better.
                        <br />
                        <span>Live Healthier.</span>
                    </h1>

                    <p className="hero-description">
                        Get personalized nutrition insights, track your
                        progress, and make healthier choices with guidance
                        designed specifically for you.
                    </p>

                    <button
                        className="hero-button"
                        onClick={() => navigate("/register")}
                    >
                        Start Your Journey →
                    </button>
                </div>

                <div className="hero-card">

                    <div className="nutrition-card">
                        <h3>Today's Nutrition</h3>

                        <div className="calorie-circle">
                            <strong>1,850</strong>
                            <span>kcal</span>
                        </div>

                        <div className="macro-row">
                            <div>
                                <strong>120g</strong>
                                <span>Protein</span>
                            </div>

                            <div>
                                <strong>210g</strong>
                                <span>Carbs</span>
                            </div>

                            <div>
                                <strong>55g</strong>
                                <span>Fats</span>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="features-section">

                <h2>
                    Everything you need for a healthier lifestyle
                </h2>

                <div className="features-grid">

                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Personalized Goals</h3>
                        <p>
                            Get nutrition recommendations based on your
                            body, lifestyle, and personal goals.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Track Your Progress</h3>
                        <p>
                            Monitor your BMI, calories, macros, and
                            nutrition progress in one place.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🥗</div>
                        <h3>Healthy Recommendations</h3>
                        <p>
                            Receive useful guidance to help you make
                            healthier food choices every day.
                        </p>
                    </div>

                </div>

            </section>

            <footer>
                <p>
                    © 2026 NutriAssist. Your journey to better health starts here.
                </p>
            </footer>

        </div>
    );
}

export default LandingPage;