const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        goal: {
            type: String,
            required: true
        },

        bmi: {
            type: Number,
            required: true
        },

        bmiCategory: {
            type: String,
            required: true
        },

        dailyCalories: {
            type: Number,
            required: true
        },

        protein: {
            type: Number,
            required: true
        },

        carbohydrates: {
            type: Number,
            required: true
        },

        fats: {
            type: Number,
            required: true
        },

        recommendations: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Suggestion = mongoose.model(
    "Suggestion",
    suggestionSchema
);

module.exports = Suggestion;