const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        foodName: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        calories: {
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

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;