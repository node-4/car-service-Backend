const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
reviewSchema.pre("save", function (next) {
    const review = this;

    if (!review.carId || !review.userId || !review.rating || !review.review) {
        return next(new Error("All fields are required"));
    }

    next();
});
