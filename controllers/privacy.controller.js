// import the PrivacyPolicy model
const PrivacyPolicy = require("../models/privacy.model");
const { createResponse } = require("../utils/response/response");
// get all privacy policies
exports.getAllPrivacyPolicies = async (req, res) => {
    try {
        const policies = await PrivacyPolicy.find();
        if (policies.length === 0) {
            return createResponse(res, 404, "No privacy policies found");
        }
        createResponse(
            res,
            200,
            "Privacy policies retrieved successfully",
            policies
        );
        // res.status(200).json({ status: 1, data: policies[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 0, message: err.message });
    }
};

// get a single privacy policy by id
exports.getPrivacyPolicyById = async (req, res) => {
    try {
        const policy = await PrivacyPolicy.findById(req.params.id);
        if (!policy) {
            return createResponse(res, 404, "Privacy policy not found");
        }
        createResponse(
            res,
            200,
            "Privacy policy retrieved successfully",
            policy
        );
        // res.status(200).json({ status: 1, data: policy });
    } catch (err) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};

// create a new privacy policy
exports.createPrivacyPolicy = async (req, res) => {
    try {
        if (!req.body.content) {
            return createResponse(res, 400, "Content is required");
        }
        const policy = new PrivacyPolicy(req.body);
        await policy.save();
        createResponse(res, 201, "Privacy policy created successfully", policy);
    } catch (err) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};

// update a privacy policy by id
exports.updatePrivacyPolicy = async (req, res) => {
    try {
        const policy = await PrivacyPolicy.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!policy) {
            return createResponse(res, 404, "Privacy policy not found");
        }
        createResponse(res, 200, "Privacy policy updated successfully", policy);
        // res.status(200).json({ status: 1, data: policy });
    } catch (err) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};

// delete a privacy policy by id
exports.deletePrivacyPolicy = async (req, res) => {
    try {
        const policy = await PrivacyPolicy.findByIdAndDelete(req.params.id);
        if (!policy) {
            return createResponse(res, 404, "Privacy policy not found");
        }
        createResponse(res, 200, "Privacy policy deleted");
        // res.status(200).json({ status: 1, message: "Privacy policy deleted" });
    } catch (err) {
        console.log(err);
        createResponse(res, 500, err.message);
    }
};
