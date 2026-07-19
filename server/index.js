const dietPlanRoute =
    require("./routes/dietPlanRoute");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db/config");

const userRoute = require("./routes/userRoute");
const suggestionRoute = require("./routes/suggestionRoute");
const foodRoute = require("./routes/foodRoute");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Nutrition Assistant API is running"
    });
});
app.use(
    "/api/diet-plans",
    dietPlanRoute
);
// API Routes
app.use("/api/users", userRoute);

app.use("/api/suggestions", suggestionRoute);

app.use("/api/food", foodRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});