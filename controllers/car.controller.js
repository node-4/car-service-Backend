const Car = require("../models/car.model");
const Brand = require('../models/brand');
const bodyFuelModelTypeVarientDb = require('../models/bodyfuelmodelvarient');
const { uploadImage } = require("../services/uploadImage");
exports.allCarsget = async (req, res) => {
    try {
        let query = {};
        if (req.query.color) {
            query.color = { $regex: req.query.color, $options: "i" };
        }
        if (req.query.transmission) {
            query.transmission = {
                $regex: req.query.transmission,
                $options: "i",
            };
        }
        if (req.query.carStatus) {
            query.carStatus = { $regex: req.query.carStatus, $options: "i" };
        }
        if (req.query.engineSize) {
            query.engineSize = req.query.engineSize;
        }
        if (req.query.priceMin && req.query.priceMax) {
            query.price = {
                $gte: req.query.priceMin,
                $lte: req.query.priceMax,
            };
        } else if (req.query.priceMin) {
            query.price = { $gte: parseInt(req.query.priceMin) };
        } else if (req.query.priceMax) {
            query.price = { $lte: parseInt(req.query.priceMax) };
        }
        const cars = await Car.find(query).lean().populate('manufacturer model fuelType bodyType variant');
        if (cars.length === 0) {
            return res.status(404).json({ message: "No cars found" });
        }
        let productsCount = await Car.count()
        res.status(200).json({ status: 200, message: "Cars data found.", data: cars, count: productsCount });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.getAllCars = async (req, res, next) => {
    try {
        const productsCount = await Car.count();
        if (req.query.search == (null || undefined)) {
            let data1 = [
                {
                    $lookup: { from: "brands", localField: "manufacturer", foreignField: "_id", as: "manufacturer" },
                },
                { $unwind: "$manufacturer" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "model", foreignField: "_id", as: "model", },
                },
                { $unwind: "$model" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "fuelType", foreignField: "_id", as: "fuelType", },
                },
                { $unwind: "$fuelType" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "bodyType", foreignField: "_id", as: "bodyType", },
                },
                { $unwind: "$bodyType" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "variant", foreignField: "_id", as: "variant", },
                },
                { $unwind: "$variant" },

            ]
            apiFeature = await Car.aggregate(data1);
            res.status(200).json({ status: 200, message: "Cars data found.", data: apiFeature, count: productsCount });
        } else {
            let apiFeature = await Car.aggregate([
                {
                    $lookup: { from: "brands", localField: "manufacturer", foreignField: "_id", as: "manufacturer" },
                },
                { $unwind: "$manufacturer" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "model", foreignField: "_id", as: "model", },
                },
                { $unwind: "$model" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "fuelType", foreignField: "_id", as: "fuelType", },
                },
                { $unwind: "$fuelType" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "bodyType", foreignField: "_id", as: "bodyType", },
                },
                { $unwind: "$bodyType" },
                {
                    $lookup: { from: "bodyfuelmodelvarients", localField: "variant", foreignField: "_id", as: "variant", },
                },
                { $unwind: "$variant" },
                {
                    $match: {
                        $or: [
                            { "manufacturer.name": { $regex: req.query.search, $options: "i" }, },
                            { "bodyType.bodyType": { $regex: req.query.search, $options: "i" }, },
                            { "fuelType.fuelType": { $regex: req.query.search, $options: "i" }, },
                            { "model.model": { $regex: req.query.search, $options: "i" }, },
                            { "variant.variant": { $regex: req.query.search, $options: "i" }, },
                        ]
                    }
                }
            ]);
            res.status(200).json({ status: 200, message: "Cars data found.", data: apiFeature, count: productsCount });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error while creating Product", });
    }
};
// Create a new car
exports.createCar = async (req, res) => {
    try {
        const {
            manufacturer,
            model,
            year,
            bodyType,
            mileage,
            color,
            variant,
            transmission,
            fuelType,
            engineSize,
            price,
            kmDriven,
            state,
            carStatus,
            description,
        } = req.body;
        const image = req.file.path;
        // console.log(image);
        const car = new Car({
            image,
            manufacturer,
            model,
            year,
            bodyType,
            mileage,
            color,
            variant,
            transmission,
            fuelType,
            engineSize,
            price,
            kmDriven,
            state,
            carStatus,
            description,
        });
        const newCar = await car.save();
        res.status(201).json({ message: "car added", data: newCar });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Get a specific car
exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).lean();
        if (car === null) {
            return res.status(404).json({ message: "Car not found" });
        }
        const checkBrand = car.manufacturer
        const verifyManufacturer = await Brand.findById({ _id: checkBrand })
        if (!verifyManufacturer) {
            return res.status(404).json({ message: "Brand not found" });
        }
        const checkModel = car.model
        const verifyModel = await bodyFuelModelTypeVarientDb.findById({ _id: checkModel })
        if (!verifyModel) {
            return res.status(404).json({ message: "Model not found" });
        }
        const checkFuelType = car.fuelType
        const verifyFuelType = await bodyFuelModelTypeVarientDb.findById({ _id: checkFuelType })
        if (!verifyFuelType) {
            return res.status(404).json({ message: "fuelType not found" });
        }
        const checkBodyType = car.bodyType
        const verifyBodyType = await bodyFuelModelTypeVarientDb.findById({ _id: checkBodyType })
        if (!verifyBodyType) {
            return res.status(404).json({ message: "BodyType not found" });
        }
        const checkVariant = car.variant
        const verifyVariant = await bodyFuelModelTypeVarientDb.findById({ _id: checkVariant })
        if (!verifyVariant) {
            return res.status(404).json({ message: "Variant not found" });
        }
        console.log("verifyVariant", verifyVariant)

        res.status(200).json({ data: car, verifyManufacturer, verifyModel, verifyFuelType, verifyBodyType, verifyVariant });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (car === null) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json({ message: "Car updated", data: car });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (car == null) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json({ message: "Car deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getRecommendedCars = async (req, res) => {
    try {
        const cars = await Car.aggregate([{ $sample: { size: 10 } }]);
        if (cars.length === 0) {
            return res.status(404).json({ message: "No cars found" });
        }
        res.status(200).json({ data: cars });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error " + err.message });
    }
};


// exports.compareCars = async (req, res) => {
//     try {
//         const { carId1, carId2 } = req.query;

//         const car1 = await Car.findById(carId1);
//         if (!car1)
//             return res.status(404).json({
//                 message: `Car with ID ${carId1} not found`,
//             });


//         const car2 = await Car.findById(carId2);
//         if (!car2)
//             return res.status(404).json({
//                 message: `Car with ID ${carId2} not found`,
//             });


//         res.status(200).json({
//             data: [{ car1: car1, car2: car2 }],
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: err.message });
//     }
// };

exports.compareCars = async (req, res) => {
    try {
        const { carId1, carId2 } = req.query;

        const car1 = await Car.findById(carId1);
        if (!car1)
            return res.status(404).json({
                message: `Car with ID ${carId1} not found`,
            });

        const {
            manufacturer,
            model,
            fuelType,
            bodyType,
            variant,
        } = car1;

        const checkManufacturer = await Brand.findById({
            _id: manufacturer,
        });
        if (!checkManufacturer) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const checkModel = await bodyFuelModelTypeVarientDb.findById({
            _id: model,
        });
        if (!checkModel) {
            return res.status(404).json({ message: "Model not found" });
        }

        const checkFuelType = await bodyFuelModelTypeVarientDb.findById({
            _id: fuelType,
        });
        if (!checkFuelType) {
            return res
                .status(404)
                .json({ message: "fuelType not found" });
        }

        const checkBodyType = await bodyFuelModelTypeVarientDb.findById({
            _id: bodyType,
        });
        if (!checkBodyType) {
            return res
                .status(404)
                .json({ message: "BodyType not found" });
        }

        const checkVariant = await bodyFuelModelTypeVarientDb.findById(
            { _id: variant }
        );
        if (!checkVariant) {
            return res.status(404).json({ message: "Variant not found" });
        }

        const car2 = await Car.findById(carId2);
        if (!car2)
            return res.status(404).json({
                message: `Car with ID ${carId2} not found`,
            });

        const {
            manufacturer: manufacturer2,
            model: model2,
            fuelType: fuelType2,
            bodyType: bodyType2,
            variant: variant2,
        } = car2;

        const response = {
            car1: {
                manufacturer,
                model,
                fuelType,
                bodyType,
                variant,
                verifyManufacturer: checkManufacturer,
                verifyModel: checkModel,
                verifyFuelType: checkFuelType,
                verifyBodyType: checkBodyType,
                verifyVariant: checkVariant,
            },
            car2: {
                manufacturer: manufacturer2,
                model: model2,
                fuelType: fuelType2,
                bodyType: bodyType2,
                variant: variant2,
                verifyManufacturer: checkManufacturer,
                verifyModel: checkModel,
                verifyFuelType: checkFuelType,
                verifyBodyType: checkBodyType,
                verifyVariant: checkVariant,
            },
        };

        res.status(200).json({ data: response });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

const mongoose = require("mongoose");
exports.compareCars1 = async (req, res) => {
    try {
        const { carId1, carId2 } = req.query;
        const car1Id = new mongoose.Types.ObjectId(carId1);
        const car2Id = new mongoose.Types.ObjectId(carId2);

        // perform the comparison between car1 and car2
        const pipeline = [
            // match the documents with given car ids
            {
                $match: {
                    _id: { $in: [car1Id, car2Id] },
                },
            },

            // group the results by car id and get the key/values as an array of objects
            {
                $group: {
                    _id: "$_id",
                    fields: {
                        $push: {
                            k: "$$ROOT",
                            v: {
                                manufacturer: "$manufacturer",
                                model: "$model",
                                year: "$year",
                                bodyType: "$bodyType",
                                variant: "$variant",
                                color: "$color",
                                mileage: "$mileage",
                                transmission: "$transmission",
                                fuelType: "$fuelType",
                                engineSize: "$engineSize",
                                kmDriven: "$kmDriven",
                            },
                        },
                    },
                },
            },

            // convert the fields array into an object with key/value pairs
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: "$fields",
                    },
                },
            },

            // project only the car1 and car2 fields for comparison
            {
                $project: {
                    car1: {
                        $cond: {
                            if: { $eq: ["$_id", car1Id] },
                            then: "$$ROOT",
                            else: null,
                        },
                    },
                    car2: {
                        $cond: {
                            if: { $eq: ["$_id", car2Id] },
                            then: "$$ROOT",
                            else: null,
                        },
                    },
                },
            },

            // project only the common fields between car1 and car2
            {
                $project: {
                    _id: 0,
                    comparison: {
                        $map: {
                            input: "$car1",
                            as: "a",
                            in: {
                                $cond: [
                                    {
                                        $ne: [
                                            {
                                                $indexOfArray: [
                                                    "$car2.k",
                                                    "$$a.k",
                                                ],
                                            },
                                            -1,
                                        ],
                                    },
                                    {
                                        key: "$$a.k",
                                        car1: "$$a.v",
                                        car2: {
                                            $arrayElemAt: [
                                                "$car2.v",
                                                {
                                                    $indexOfArray: [
                                                        "$car2.k",
                                                        "$$a.k",
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                    null,
                                ],
                            },
                        },
                    },
                },
            },

            // filter out null values from the comparison array
            {
                $project: {
                    comparison: {
                        $filter: {
                            input: "$comparison",
                            as: "c",
                            cond: { $ne: ["$$c", null] },
                        },
                    },
                },
            },

            // unwind the comparison array to get individual comparisons
            {
                $unwind: "$comparison",
            },

            // replace dots with whitespaces in the keys (for readability)
            {
                $addFields: {
                    "comparison.key": {
                        $replaceAll: {
                            input: "$comparison.key",
                            find: "\\.",
                            replacement: " ",
                        },
                    },
                },
            },
        ];

        // execute the aggregation pipeline
        const comparison = await Car.aggregate(pipeline);

        console.log(comparison[0].comparison);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};
const { ObjectId } = require("mongodb");
const { findById } = require("../models/car-spare-parts.model");

// exports.compareCars = async (req, res) => {
//     try {
//         const car1Id = req.query.car1;
//         const car2Id = req.query.car2;

//         // Match cars by their ids.
//         const cars = await Car.aggregate([
//             {
//                 $match: {
//                     _id: { $in: [ObjectId(car1Id), ObjectId(car2Id)] },
//                 },
//             },
//             // Group the cars by null object to create one document for all the cars.
//             {
//                 $group: {
//                     _id: null,
//                     cars: { $push: "$$ROOT" },
//                 },
//             },
//             // Project only required fields of the cars objects
//             {
//                 $project: {
//                     _id: 0,
//                     cars: {
//                         _id: true,
//                         manufacturer: true,
//                         model: true,
//                         year: true,
//                         bodyType: true,
//                         color: true,
//                         price: true,
//                     },
//                 },
//             },
//         ]);

//         if (!cars.length) {
//             return res.status(404).json({ message: "Cars not found" });
//         }

//         // Compare the cars and send response.
//         const comparedCars = compareTwoCars(car1, car2);
//         res.status(200).json(comparedCars);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: "Something went wrong",
//         });
//     }
// };

function compareTwoCars(car1, car2) {
    // A function to handle the comparison of two cars.
}

// me

exports.getSimilarCars = async (req, res) => {
    try {
        const { manufacturer, model, bodyType, price } = req.body;
        const similarityCriteria = {
            // manufacturer,
            // model,
            bodyType,
            // price: { $gt: price - 1000, $lt: price + 1000 },
        };
        const similarCars = await Car.find(similarityCriteria).limit(10);

        res.status(200).json({ message: "Similar cars found", data: similarCars });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getCarsByYear = async (req, res) => {
    try {
        const year = req.params.year;
        const cars = await Car.find({ year: year });
        if (cars.length === 0) {
            return res.status(400).json({ status: 400, message: "No data found" });
        }

        res.status(200).json({ message: "Cars found", data: cars });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};



exports.getFuelTypes = async (req, res) => {
    try {
        const carId = req.params.carId;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ status: 404, message: "Car not found" });
        }
        const fuelTypes = await Car.distinct('fuelType', { _id: carId });
        const verifiedFuelTypes = await bodyFuelModelTypeVarientDb.find({ _id: { $in: fuelTypes } });

        if (!verifiedFuelTypes) {
            return res.status(400).json({ status: 400, message: "No data found" });
        }

        res.status(200).json({ message: "Fuel types found", data: verifiedFuelTypes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};



exports.getKmDrivenValues = async (req, res) => {
    try {
        const carId = req.params.carId;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        const kmDrivenValue = car.kmDriven;

        res.status(200).json({ message: "Kilometer driven value found", data: kmDrivenValue });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
