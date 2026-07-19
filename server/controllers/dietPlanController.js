const DietPlan = require("../models/DietPlan");


// Create Diet Plan
const createDietPlan = async (req, res) => {
    try {
        const {
            planName,
            goal,
            startDate,
            endDate,
            dietaryPreference,
            restrictions,
            notes
        } = req.body;

        if (
            !planName ||
            !goal ||
            !startDate ||
            !endDate
        ) {
            return res.status(400).json({
                message:
                    "Plan name, goal, start date, and end date are required"
            });
        }

        if (
            new Date(endDate) <
            new Date(startDate)
        ) {
            return res.status(400).json({
                message:
                    "End date cannot be before start date"
            });
        }

        const dietPlan = await DietPlan.create({
            userId: req.userId,
            planName,
            goal,
            startDate,
            endDate,
            dietaryPreference,
            restrictions,
            notes
        });

        res.status(201).json({
            message:
                "Diet plan created successfully",
            dietPlan
        });

    } catch (error) {
        res.status(500).json({
            message:
                "Failed to create diet plan",
            error: error.message
        });
    }
};


// Get User Diet Plans
const getDietPlans = async (req, res) => {
    try {
        const dietPlans = await DietPlan.find({
            userId: req.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            dietPlans
        });

    } catch (error) {
        res.status(500).json({
            message:
                "Failed to fetch diet plans",
            error: error.message
        });
    }
};


// Update Diet Plan Status
const updateDietPlanStatus = async (req, res) => {
    try {
        const {
            status
        } = req.body;

        if (
            ![
                "active",
                "completed"
            ].includes(status)
        ) {
            return res.status(400).json({
                message:
                    "Invalid status"
            });
        }

        const dietPlan =
            await DietPlan.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.userId
                },
                {
                    status
                },
                {
                    new: true
                }
            );

        if (!dietPlan) {
            return res.status(404).json({
                message:
                    "Diet plan not found"
            });
        }

        res.status(200).json({
            message:
                "Diet plan status updated",
            dietPlan
        });

    } catch (error) {
        res.status(500).json({
            message:
                "Failed to update diet plan",
            error: error.message
        });
    }
};


// Delete Diet Plan
const deleteDietPlan = async (req, res) => {
    try {
        const dietPlan =
            await DietPlan.findOneAndDelete({
                _id: req.params.id,
                userId: req.userId
            });

        if (!dietPlan) {
            return res.status(404).json({
                message:
                    "Diet plan not found"
            });
        }

        res.status(200).json({
            message:
                "Diet plan deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:
                "Failed to delete diet plan",
            error: error.message
        });
    }
};


module.exports = {
    createDietPlan,
    getDietPlans,
    updateDietPlanStatus,
    deleteDietPlan
};