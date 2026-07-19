const express = require("express");

const {
    createDietPlan,
    getDietPlans,
    updateDietPlanStatus,
    deleteDietPlan
} = require("../controllers/dietPlanController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createDietPlan
);

router.get(
    "/",
    authMiddleware,
    getDietPlans
);

router.put(
    "/:id/status",
    authMiddleware,
    updateDietPlanStatus
);

router.delete(
    "/:id",
    authMiddleware,
    deleteDietPlan
);

module.exports = router;