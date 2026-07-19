const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        planName: {
            type: String,
            required: true
        },

        goal: {
            type: String,
            required: true,
            enum: [
                "weight loss",
                "maintenance",
                "weight gain"
            ]
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        dietaryPreference: {
            type: String,
            default: "No specific preference"
        },

        restrictions: {
            type: String,
            default: ""
        },

        notes: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "active",
                "completed"
            ],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

const DietPlan = mongoose.model(
    "DietPlan",
    dietPlanSchema
);

module.exports = DietPlan;