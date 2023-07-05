const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/car-service-order-review");

// Route to handle creating a new Review document
router.post("/car-service-order-review", reviewController.createReview);

// Route to handle retrieving all Review documents
router.get("/car-service-order-review", reviewController.getReviews);

// Route to handle retrieving a Review document by ID
router.get("/car-service-order-review/:id", reviewController.getReviewById);

// Route to handle updating a Review document by ID
router.put("/car-service-order-review/:id", reviewController.updateReview);

// Route to handle deleting a Review document by ID
router.delete("/car-service-order-review/:id", reviewController.deleteReview);

module.exports = router;
