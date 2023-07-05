const HelpAndSupport = require("../models/helpAndSupport");
const { createResponse } = require("../utils/response/response");
exports.createHelpAndSupport = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.message ||
            !req.body.subject
        ) {
            return createResponse(res, 400, "Please fill all the fields");
        }
        const helpAndSupport = new HelpAndSupport(req.body);
        await helpAndSupport.save();
        createResponse(
            res,
            201,
            "Help and support created successfully",
            helpAndSupport
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.getHelpAndSupports = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.startDate && req.query.endDate) {
            queryObj.createdAt = {
                $gte: req.query.startDate,
                $lte: req.query.endDate,
            };
        } else if (req.query.startDate) {
            queryObj.createdAt = {
                $gte: req.query.startDate,
            };
        } else if (req.query.endDate) {
            queryObj.createdAt = {
                $lte: req.query.endDate,
            };
        } else {
            queryObj = {};
        }

        const helpAndSupports = await HelpAndSupport.find(queryObj);
        createResponse(
            res,
            200,
            "Help and supports retrieved successfully",
            helpAndSupports
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.getHelpAndSupport = async (req, res) => {
    try {
        const helpAndSupport = await HelpAndSupport.findById(req.params.id);
        if (!helpAndSupport) {
            createResponse(res, 404, "Help and support not found");
            return;
        }
        createResponse(
            res,
            200,
            "Help and support retrieved successfully",
            helpAndSupport
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.updateHelpAndSupport = async (req, res) => {
    try {
        const helpAndSupport = await HelpAndSupport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!helpAndSupport) {
            createResponse(res, 404, "Help and support not found");
            return;
        }
        createResponse(
            res,
            200,
            "Help and support updated successfully",
            helpAndSupport
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.deleteHelpAndSupport = async (req, res) => {
    try {
        const helpAndSupport = await HelpAndSupport.findByIdAndDelete(
            req.params.id
        );
        if (!helpAndSupport) {
            createResponse(res, 404, "Help and support not found");
            return;
        }
        createResponse(res, 200, "Help and support deleted successfully");
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};
