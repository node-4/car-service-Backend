const Review = require("../models/car-service-order-review"); // Import the Review model
const { createResponse } = require("../utils/response/response"); // Import the createResponse utility function
const CarServiceOrder = require("../models/car-service-order"); // Import the CarServiceOrder model
const CarService = require("../models/car-service.model"); // Import the CarService
// Function to handle creating a new Review document
const createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        // const carServiceOrder = await CarServiceOrder.findById(
        //     req.body.carServiceOrderId
        // );
        // if (!carServiceOrder) {
        //     createResponse(res, 404, "Car service order not found");
        //     return;
        // }
        const carService = await CarService.findById(req.body.carServiceId);
        let oldRating =
            carService.rating == "unrated" || carService.rating == "NaN"
                ? 0
                : carService.rating;
        carService.rating = (newReview.rating + oldRating / 2).toFixed(2);
        await carService.save();
        createResponse(res, 201, "Review created successfully", newReview);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle retrieving all Review documents
const getReviews = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.carServiceOrderId) {
            queryObj.carServiceOrderId = req.query.carServiceOrderId;
        }
        if (req.query.rating) {
            queryObj.rating = req.query.rating;
        }
        const reviews = await Review.find(queryObj).lean().sort(-rating);
        if (reviews.length === 0) {
            return createResponse(res, 404, "Reviews not found");
        }
        createResponse(res, 200, "Reviews retrieved successfully", reviews);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle retrieving a Review document by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            createResponse(res, 404, "Review not found");
            return;
        }
        createResponse(res, 200, "Review retrieved successfully", review);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle updating a Review document by ID
const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReview) {
            createResponse(res, 404, "Review not found");
            return;
        }
        createResponse(res, 200, "Review updated successfully", updatedReview);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle deleting a Review document by ID
const deleteReview = async (req, res) => {
    try {
        if (!(await Review.findByIdAndDelete(req.params.id))) {
            return createResponse(res, 404, "Review not found");
        }
        createResponse(res, 200, "Review deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
