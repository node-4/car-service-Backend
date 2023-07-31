const express = require("express");
const router = express.Router();
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewsbyUser,
  getReviewById,
} = require("../controllers/rating-review");


router.get("/rating-reviews", getReviews);
router.get("/rating-reviews/:userId", getReviewsbyUser);
router.get("/rating-reviews/:id", getReviewById);
router.post("/rating-reviews", createReview);
router.put("/rating-reviews/:id", updateReview);
router.delete("/rating-reviews/:id", deleteReview);
router.post("/feedback", deleteReview);

module.exports = router;
