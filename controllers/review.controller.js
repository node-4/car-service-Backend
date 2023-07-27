const Review = require("../models/review.model");
const CarDb = require("../models/car.model");

const { getCarById } = require("../services/car-services");
const { getAllReviews } = require("../services/review-service");
// Get all reviews
exports.getReviews = async (req, res) => {
    try {
        let query = {};
        if (req.query.carId) {
            query.carId = req.query.carId;
        }
        if (req.query.rating) {
            req.query.rating = parseInt(req.query.rating);
            query.rating = req.query.rating;
        }
        const reviews = await Review.find(query);
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ msg: "No reviews found" });
        }
        res.status(200).json({ data: reviews });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error " + err.message });
    }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ msg: "Review not found" });
        }
        res.status(200).json({ data: review });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Review not found" });
        }
        res.status(500).json({ message: "Server Error " + err.message });
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);
        const date = new Date();
        const { carId, rating, review } = req.body;
        const newReview = new Review({
            carId,
            userId,
            rating,
            date,
            review,
        });
        const checkCarId = await CarDb.findById({ _id: carId })
        if (!checkCarId) {
            return res.status(404).json({ msg: "CarId not found" });
        }
        const updatedReview = await newReview.save();
        const reviews = await getAllReviews(carId);
        const car = await getCarById(carId);
        car.averageRating =
            reviews.length > 0
                ? (car.averageRating + updatedReview.rating / 2).toFixed(2)
                : updatedReview.rating;
        await car.save();
        res.status(201).json({
            message: "Review submitted",
            data: updatedReview,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error " + err.message });
    }
};

// Update an existing review by ID
exports.updateReview = async (req, res) => {
    try {
        const reviewFields = {};
        // if (carId) reviewFields.carId = carId;
        if (userId) reviewFields.userId = userId;
        if (rating) reviewFields.rating = rating;
        if (review) reviewFields.review = review;

        const reviewToUpdate = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: reviewFields },
            { new: true }
        );
        res.status(200).json({ message: "Updated review" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error " + err.message });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const reviewToDelete = await Review.findByIdAndDelete(req.params.id);
        if (!reviewToDelete) {
            return res.status(404).json({ msg: "Review not found" });
        }

        res.status(200).json({ msg: "Review removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error " + err.message });
    }
};
