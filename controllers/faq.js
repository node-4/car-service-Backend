const Faq = require("../models/faq.model"); // Import the FAQ model
const { createResponse } = require("../utils/response/response"); // Import the createResponse function

exports.createFaq = async (req, res) => {
    try {
        if (!req.body.question || !req.body.answer) {
            return createResponse(res, 400, "Question and answer are required");
        }
        const faq = new Faq(req.body);
        await faq.save();
        createResponse(res, 201, "FAQ created successfully", faq);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find();
        if (!faqs.length) {
            return createResponse(res, 404, "No FAQs found");
        }
        createResponse(res, 200, "FAQs retrieved successfully", faqs);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getFaq = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return createResponse(res, 404, "FAQ not found");
        }
        createResponse(res, 200, "FAQ retrieved successfully", faq);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.updateFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!faq) {
            return createResponse(res, 404, "FAQ not found");
        }
        createResponse(res, 200, "FAQ updated successfully", faq);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id);
        if (!faq) {
            return createResponse(res, 404, "FAQ not found");
        }
        createResponse(res, 200, "FAQ deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
