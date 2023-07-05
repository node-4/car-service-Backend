const Testimonial = require("../models/Testimonial");
const mongoose = require("mongoose");
const { createResponse } = require("../utils/response/response");
exports.createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        createResponse(
            res,
            201,
            "Testimonial created successfully",
            testimonial
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        if (!testimonials || testimonials.length === 0) {
            return createResponse(res, 404, "Testimonials not found");
        }
        createResponse(
            res,
            200,
            "Testimonials fetched successfully",
            testimonials
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.getTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.aggregate([
            { _id: mongoose.Types.ObjectId(req.params.id) },
        ]);
        if (!testimonial) {
            createResponse(res, 404, "Testimonial not found");
            return;
        }
        createResponse(
            res,
            200,
            "Testimonial fetched successfully",
            testimonial
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!testimonial) {
            createResponse(res, 404, "Testimonial not found");
            return;
        }
        createResponse(
            res,
            200,
            "Testimonial updated successfully",
            testimonial
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};
