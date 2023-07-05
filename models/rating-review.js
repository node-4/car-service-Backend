const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 5,
        },
        content: {
            type: String,
            default: "",
            required: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Rating-Review", reviewSchema);

module.exports = Review;
