const { createResponse } = require("../utils/response/response");
const Review = require("../models/rating-review");

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        if (reviews.length === 0) {
            return createResponse(res, 404, "No reviews found");
        }
        createResponse(res, 200, "Reviews retrieved successfully", reviews);
    } catch (err) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};

exports.getReviewsbyUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const reviews = await Review.find({ userId });
        res.json(reviews);
    } catch (error) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};

exports.getReviewById = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return createResponse(res, 404, "Review not found");
      }
      createResponse(res, 200, "Review Get successfully", review);
    } catch (err) {
      console.log(err);
      createResponse(res, 400, err.message);
    }
};

exports.createReview = async (req, res) => {
    try {
        const { rating, content, userId } = req.body;

        if (!rating || !content) {
            return createResponse(res, 400, "Rating and content are required");
        }
        if (rating < 1 || rating > 5) {
            return createResponse(res, 400, "Rating must be between 1 and 5");
        }
        const reviewResult = new Review({ rating, content, userId });
        await reviewResult.save();
        createResponse(res, 201, "Review created successfully", reviewResult);
    } catch (err) {
        console.log(err);
        createResponse(res, 400, err.message);
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!review) {
            return createResponse(res, 404, "Review not found");
        }
        createResponse(res, 200, "Review updated successfully", review);
    } catch (err) {
        console.log(err);
        createResponse(res, 400, err.message);
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return createResponse(res, 404, "Review not found");
        }
        createResponse(res, 200, "Review deleted successfully");
    } catch (err) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};

exports.createfeedback = async (req, res) => {
  try {
    const { content } = req.body;

    if (content) {
      return createResponse(res, 400, "content are required");
    }

    const reviewResult = new Review({content });
    await reviewResult.save();
    createResponse(res, 201, "Feedback created successfully", reviewResult);
  } catch (err) {
    console.log(err);
    createResponse(res, 400, err.message);
  }
};