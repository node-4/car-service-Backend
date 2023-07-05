const Review = require("../models/review.model");

const getReviewById = async (id) => {
    try {
        const review = await Review.findById(id);
        if (!review) {
            return null;
        }
        return review;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

const getAllReviews = async (carId) => {
    try {
        const review = await Review.find({ carId: carId });
        console.log(review);
        if (!review || review.length === 0) {
            return null;
        }
        return review;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

module.exports = {
    getReviewById,
    getAllReviews,
};
