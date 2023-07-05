const CarSparePart = require("../models/car-spare-parts.model");
const { createResponse } = require("../utils/response/response");
const mongoose = require("mongoose");
exports.createCarSparePart = async (req, res) => {
    try {
        const { name, price, description, car, userId, image } = req.body;
        const discountPercentage = req.body.discountPercentage
            ? req.body.discountPercentage
            : 0;
        const discountedPrice = (
            parseInt(price) -
            (parseInt(price) * discountPercentage) / 100
        ).toFixed(2);
        console.log(discountedPrice);
        const carSparePart = new CarSparePart({
            name,
            userId,
            price,
            car,
            description,
            image,
            discountPercentage,
            discountedPrice,
        });
        await carSparePart.save();
        createResponse(
            res,
            201,
            "Car spare part created successfully",
            carSparePart
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getCarSpareParts = async (req, res) => {
    try {
        const carFilter = req.query.car;
        const spareParts = await CarSparePart.aggregate([
            {
                $match: {
                    car: {
                        $regex: new RegExp(carFilter, "i"),
                    },
                },
            },
            {
                $addFields: {
                    priceAfterDiscount: {
                        $cond: {
                            if: { $gt: ["$discountPercentage", 0] },
                            then: {
                                $multiply: [
                                    {
                                        $convert: {
                                            input: "$price",
                                            to: "double",
                                        },
                                    },
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            else: {
                                $convert: {
                                    input: "$price",
                                    to: "double",
                                },
                            },
                        },
                    },
                },
            },
        ]);
        createResponse(
            res,
            200,
            "Spare parts fetched successfully",
            spareParts
        );
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

exports.getCarSparePart = async (req, res) => {
    try {
        const carSparePart = await CarSparePart.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                $addFields: {
                    priceAfterDiscount: {
                        $cond: {
                            if: { $gt: ["$discountPercentage", 0] },
                            then: {
                                $multiply: [
                                    {
                                        $convert: {
                                            input: "$price",
                                            to: "double",
                                        },
                                    },
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            else: {
                                $convert: {
                                    input: "$price",
                                    to: "double",
                                },
                            },
                        },
                    },
                },
            },
        ]);
        if (!carSparePart) {
            return createResponse(res, 404, "Car spare part not found");
        }
        createResponse(
            res,
            200,
            "Car spare part fetched successfully",
            carSparePart
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.updateCarSparePart = async (req, res) => {
    try {
        const carSparePart = await CarSparePart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!carSparePart) {
            return createResponse(res, 404, "Car spare part not found");
        }
        createResponse(
            res,
            200,
            "Car spare part updated successfully",
            carSparePart
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.deleteCarSparePart = async (req, res) => {
    try {
        const carSparePart = await CarSparePart.findByIdAndDelete(
            req.params.id
        );
        if (!carSparePart) {
            return createResponse(res, 404, "Car spare part not found");
        }
        createResponse(res, 200, "Car spare part deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
