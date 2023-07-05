const express = require("express");
const router = express.Router();
const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
} = require("../controllers/rating-review");

router.get("/rating-reviews", getReviews);
router.get("/rating-reviews/:id", getReview);
router.post("/rating-reviews", createReview);
router.put("/rating-reviews/:id", updateReview);
router.delete("/rating-reviews/:id", deleteReview);

module.exports = router;
