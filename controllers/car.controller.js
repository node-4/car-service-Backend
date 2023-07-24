const Car = require("../models/car.model");
const { uploadImage } = require("../services/uploadImage");
// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        let query = {};

        if (req.query.manufacturer) {
            query.manufacturer = {
                $regex: req.query.manufacturer,
                $options: "i",
            };
        }

        if (req.query.model) {
            query.model = { $regex: req.query.model, $options: "i" };
        }

        if (req.query.color) {
            query.color = { $regex: req.query.color, $options: "i" };
        }

        if (req.query.transmission) {
            query.transmission = {
                $regex: req.query.transmission,
                $options: "i",
            };
        }

        if (req.query.fuelType) {
            query.fuelType = { $regex: req.query.fuelType, $options: "i" };
        }
        if (req.query.carStatus) {
            query.carStatus = { $regex: req.query.carStatus, $options: "i" };
        }
        if (req.query.bodyType) {
            query.bodyType = { $regex: req.query.bodyType, $options: "i" };
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
        const cars = await Car.find(query).lean();
        if (cars.length === 0) {
            return res.status(404).json({ message: "No cars found" });
        }
        res.json({ message: "Cars data found", data: cars });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
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
        res.status(200).json({ data: car });
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

exports.compareCars = async (req, res) => {
    try {
        const { carId1, carId2 } = req.query;

        const car1 = await Car.findById(carId1);
        console.log(car1);
        if (!car1)
            return res.status(404)({
                message: `Car with ID ${carId1} not found`,
            });

        const car2 = await Car.findById(carId2);
        console.log(car1);
        if (!car2)
            return res.status(404)({
                message: `Car with ID ${carId2} not found`,
            });

        res.status(200).json({ data: [car1, car2] });
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
