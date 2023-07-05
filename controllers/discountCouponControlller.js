const DiscountCoupon = require("../models/discountCoupon");
const { createResponse } = require("../utils/response/response");

exports.createDiscountCoupon = async (req, res) => {
    try {
        const {
            code,
            is_active,
            discountPercentage,
            validFrom,
            validUntil,
            minimumPurchase,
            maximumDiscount,
        } = req.body;
        if (
            !code ||
            !discountPercentage ||
            !validFrom ||
            !validUntil ||
            !minimumPurchase ||
            !maximumDiscount
        ) {
            return createResponse(res, 400, "Please fill all the fields");
        }

        const discountCoupon = new DiscountCoupon(req.body);
        await discountCoupon.save();
        createResponse(
            res,
            201,
            "Discount coupon created successfully",
            discountCoupon
        );
    } catch (error) {
        console.log(error);
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getDiscountCoupons = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.code) {
            queryObj.code = RegExp(req.query.code, "i");
        }
        const discountCoupons = await DiscountCoupon.find(queryObj).lean();
        if (!discountCoupons.length) {
            return createResponse(res, 200, "No discount coupons found", []);
        }

        createResponse(
            res,
            200,
            "Discount coupons retrieved successfully",
            discountCoupons
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getDiscountCoupon = async (req, res) => {
    try {
        const discountCoupon = await DiscountCoupon.findById(req.params.id);
        if (!discountCoupon) {
            createResponse(res, 404, "Discount coupon not found");
            return;
        }
        createResponse(
            res,
            200,
            "Discount coupon retrieved successfully",
            discountCoupon
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.updateDiscountCoupon = async (req, res) => {
    try {
        const discountCoupon = await DiscountCoupon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!discountCoupon) {
            createResponse(res, 404, "Discount coupon not found");
            return;
        }
        createResponse(
            res,
            200,
            "Discount coupon updated successfully",
            discountCoupon
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.deleteDiscountCoupon = async (req, res) => {
    try {
        const discountCoupon = await DiscountCoupon.findByIdAndDelete(
            req.params.id
        );
        if (!discountCoupon) {
            createResponse(res, 404, "Discount coupon not found");
            return;
        }
        createResponse(res, 200, "Discount coupon deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
