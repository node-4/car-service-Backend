const router = require("express").Router();
const review = require("../controllers/review.controller");
const { authJwt } = require("../middlewares");
// Get all reviews
router.get("/reviews", review.getReviews);
// Get a single review by ID
router.get("/reviews/:id", review.getReviewById);
router.patch("/reviews/car/:id", review.updateReview);
router.delete("/reviews/car/:id", review.deleteReview);
// Create a new review
router.post("/reviews", [authJwt.verifyToken], review.createReview);
module.exports = router;
