const CarServiceOrder = require("../models/car-service-order");
const { createResponse } = require("../utils/response/response");
const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Notification = require("../models/notification");

exports.createCarServiceOrder = async (req, res) => {
    try {
        const indiaTime = moment.tz(Date.now(), "Asia/Kolkata");
        const date = indiaTime.format("DD-MM-YYYY");
        const time = indiaTime.format("hh:mm:ss");

        const { carServiceId, userId, address, vendorId, amount } = req.body;
        const newCarServiceOrder = new CarServiceOrder({
            carServiceId,
            vendorId,
            userId,
            date,
            time,
            address,
            amount,
        });
        const savedCarServiceOrder = await newCarServiceOrder.save();
        await Notification.create({
            userId: userId,
            message: "Your order is initaited",
            date: date,
            time: time,
        });
        createResponse(res, 201, "order created", savedCarServiceOrder);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            500,
            "internal server error " + error.message,
            error.message
        );
    }
};

exports.getCarServiceOrders1 = async (req, res) => {
    try {
        let query = {};
        if (req.query.userId) {
            query.userId = req.query.userId;
        }
        if (vendorId) {
            query.vendorId = vendorId;
        }
        if (req.query.status) {
            query.status = req.query.status;
        }
        if (req.query.date) {
            query.date = req.query.date;
        }
        if (req.query.carServiceId) {
            query.carServiceId = req.query.carServiceId;
        }
        const carServiceOrders = await CarServiceOrder.find(query).lean();
        if (!carServiceOrders || carServiceOrders.length === 0) {
            return createResponse({
                message: "No car service orders found",
            });
        }
        createResponse(res, 200, "order created", carServiceOrders);
    } catch (error) {
        console.log(error);
        res.status(400).createResponse({ error: error.message });
    }
};
exports.getCarServiceOrders = async (req, res) => {
    try {
        let match = {};
        if (req.query.userId) {
            match.userId = new mongoose.Types.ObjectId(req.query.userId);
        }
        if (req.query.vendorId) {
            match.vendorId = new mongoose.Types.ObjectId(req.query.vendorId);
        }
        if (req.query.status) {
            match.status = req.query.status;
        }
        if (req.query.date) {
            match.date = req.query.date;
        }
        if (req.query.carServiceId) {
            match.carServiceId = mongoose.Types.ObjectId(
                req.query.carServiceId
            );
        }

        const carServiceOrders = await CarServiceOrder.aggregate([
            { $match: match },
            //     {
            //         $lookup: {
            //             from: "services",
            //             localField: "carServiceId",
            //             foreignField: "_id",
            //             as: "service",
            //         },
            //     },
            //     { $unwind: "$service" },
            //     {
            //         $lookup: {
            //             from: "users",
            //             localField: "userId",
            //             foreignField: "_id",
            //             as: "user",
            //         },
            //     },
            //     { $unwind: "$user" },
            //     { $project: { __v: 0 } },
        ]);

        if (!carServiceOrders || carServiceOrders.length === 0) {
            createResponse(res, 200, "orders not found ", []);
        }

        createResponse(res, 200, "orders fetched ", carServiceOrders);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            500,
            "internal server error " + error.message,
            error.message
        );
    }
};
exports.getCarServiceOrderById = async (req, res) => {
    try {
        const carServiceOrder = await CarServiceOrder.findById(req.params.id);
        if (!carServiceOrder) {
            return createResponse(res, 404, "No car service order found");
        }
        createResponse(res, 200, "order created", carServiceOrder);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            500,
            "internal server error " + error.message,
            error.message
        );
    }
};
exports.updateCarServiceOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const { carServiceId, userId, date, time, address, status } = req.body;
        const updatedCarServiceOrder = await CarServiceOrder.findByIdAndUpdate(
            id,
            {
                carServiceId,

                userId,
                date,
                time,
                address,
                status,
            },
            { new: true }
        );
        createResponse(res, 200, "order updated", updatedCarServiceOrder);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            400,
            "Error updating car service order " + error.message,
            error.message
        );
    }
};

exports.deleteCarServiceOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCarServiceOrder = await CarServiceOrder.findByIdAndDelete(
            id
        );
        createResponse(res, 200, "order deleted", deletedCarServiceOrder);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            400,
            "Error deleting car service order " + error.message,
            error.message
        );
    }
};
