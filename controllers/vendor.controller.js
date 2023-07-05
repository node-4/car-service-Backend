const { createResponse } = require("../utils/response/response");
const Vendor = require("../models/vendor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret, accessTokenTime } = require("../configs/auth.config");

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Vendor.findOne({ email });
        if (existingUser) {
            return createResponse(res, 400, "Email already in use");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Vendor({ ...req.body, password: hashedPassword });
        await user.save();
        createResponse(res, 201, "User created successfully", user);
    } catch (err) {
        createResponse(res, 500, err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return createResponse(
                res,
                400,
                "Please provide email and password"
            );
        const user = await Vendor.findOne({ email });
        if (!user) {
            return createResponse(res, 404, "User not found");
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return createResponse(res, 401, "Invalid email or password");
        }
        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: accessTokenTime,
        });
        createResponse(res, 200, "Login successful", { token, user });
    } catch (err) {
        createResponse(res, 500, err.message);
    }
};
exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        if (vendors.length === 0) {
            return createResponse(res, 404, "No vendors found");
        }
        createResponse(res, 200, "Vendors retrieved successfully", vendors);
    } catch (err) {
        createResponse(res, 500, err.message);
    }
};

exports.getVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return createResponse(res, 404, "Vendor not found");
        }
        createResponse(res, 200, "Vendor retrieved successfully", vendor);
    } catch (err) {
        createResponse(res, 500, err.message);
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!vendor) {
            return createResponse(res, 404, "Vendor not found");
        }
        createResponse(res, 200, "Vendor updated successfully", vendor);
    } catch (err) {
        createResponse(res, 400, err.message);
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return createResponse(res, 404, "Vendor not found");
        }
        createResponse(res, 200, "Vendor deleted successfully");
    } catch (err) {
        createResponse(res, 500, err.message);
    }
};
