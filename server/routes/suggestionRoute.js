const express = require("express");

const {
    createSuggestion,
    getUserSuggestions
} = require("../controllers/SuggestedController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create nutrition suggestion
router.post(
    "/",
    authMiddleware,
    createSuggestion
);

// Get logged-in user's suggestions
router.get(
    "/",
    authMiddleware,
    getUserSuggestions
);

module.exports = router;