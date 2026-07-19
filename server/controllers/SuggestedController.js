const User = require("../models/User");
const Suggestion = require("../models/Suggestion");
const suggestNutrition = require("../utils/suggestNutrition");

// Create Nutrition Suggestion
const createSuggestion = async (req, res) => {
    try {
        const {
            goal,
            age,
            weight,
            height,
            gender,
            activityLevel
        } = req.body;

        if (
            !goal ||
            !age ||
            !weight ||
            !height ||
            !gender ||
            !activityLevel
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const nutritionData = suggestNutrition({
            age,
            weight,
            height,
            gender,
            activityLevel,
            goal
        });

        const suggestion = await Suggestion.create({
            userId: req.userId,
            goal,
            ...nutritionData
        });

        res.status(201).json({
            message: "Nutrition suggestion created successfully",
            suggestion
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create nutrition suggestion",
            error: error.message
        });
    }
};


// Get User Suggestions
const getUserSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            suggestions
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch suggestions",
            error: error.message
        });
    }
};


module.exports = {
    createSuggestion,
    getUserSuggestions
};