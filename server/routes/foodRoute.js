const express = require("express");

const {
    addFood,
    getUserFood,
    deleteFood
} = require("../controllers/foodController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    addFood
);

router.get(
    "/",
    authMiddleware,
    getUserFood
);

router.delete(
    "/:id",
    authMiddleware,
    deleteFood
);

module.exports = router;