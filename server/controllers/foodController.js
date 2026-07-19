const Food = require("../models/Food");

// Add Food
const addFood = async (req, res) => {
    try {
        const {
            foodName,
            quantity,
            calories,
            protein,
            carbohydrates,
            fats
        } = req.body;

        if (
            !foodName ||
            !quantity ||
            calories === undefined ||
            protein === undefined ||
            carbohydrates === undefined ||
            fats === undefined
        ) {
            return res.status(400).json({
                message: "All food details are required"
            });
        }

        const food = await Food.create({
            userId: req.userId,
            foodName,
            quantity,
            calories,
            protein,
            carbohydrates,
            fats
        });

        res.status(201).json({
            message: "Food added successfully",
            food
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add food",
            error: error.message
        });
    }
};


// Get User Food
const getUserFood = async (req, res) => {
    try {
        const food = await Food.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            food
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch food records",
            error: error.message
        });
    }
};


// Delete Food
const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;

        const food = await Food.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!food) {
            return res.status(404).json({
                message: "Food record not found"
            });
        }

        res.status(200).json({
            message: "Food deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete food",
            error: error.message
        });
    }
};


module.exports = {
    addFood,
    getUserFood,
    deleteFood
};