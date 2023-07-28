const Payment = require("../models/payment");
const User = require("../models/user.model");
const { createResponse } = require("../utils/response/response");
const Razorpay = require("razorpay");
const uuid = require("uuid");
const instance = new Razorpay({
    key_id: "rzp_live_oe2m9rifPN1OM5",
    key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
});

const id = uuid.v4();
const Order = require("../models/car-service-order");
exports.createPayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        console.log("order", order);
        if (!order) {
            return res.status(400).json({ status: 400, message: "No data found with this orderId" });
        }
        const data = {
            amount: order.amount * 100,
            currency: "INR",
            receipt: id,
            partial_payment: false,
        };
        console.log(data);
        const result = await instance.orders.create(data);
        console.log(result);
        const paymentObj = {
            userId: req.body.userId,
            orderId: req.params.id,
            receiptId: result.receipt,
            amount: req.body.amount,
            currency: result.currency,
            paymentStatus: "pending",
            order_id: result.id,
            paymentMethod: req.body.paymentMethod,
        };
        const payment = await Payment.create(paymentObj);
        console.log(payment);
        createResponse(res, 201, "Payment created successfully", payment);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        createResponse(res, 200, "Payments retrieved successfully", payments);
    } catch (error) {
        con;
        createResponse(res, 500, error.message);
    }
};

exports.getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            createResponse(res, 404, "Payment not found");
            return;
        }
        createResponse(res, 200, "Payment retrieved successfully", payment);
    } catch (error) {
        con;
        createResponse(res, 500, error.message);
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!payment) {
            createResponse(res, 404, "Payment not found");
            return;
        }
        createResponse(res, 200, "Payment updated successfully", payment);
    } catch (error) {
        con;
        createResponse(res, 500, error.message);
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            createResponse(res, 404, "Payment not found");
            return;
        }
        createResponse(res, 200, "Payment deleted successfully");
    } catch (error) {
        con;
        createResponse(res, 500, error.message);
    }
};
