const UsedCar = require("../models/UsedCar");
const Car = require("../models/car.model");

const createUsedCar = async (req, res) => {
  try {
    const newUsedCar = await UsedCar.create(req.body);
    res.status(201).json({
      message: "Used Car Created Successfully",
      UsedCar: newUsedCar,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the used car" });
  }
};

const getOldCars = async (req, res) => {
  try {
    const { kmsDriven, runningAvgDaily, state } = req.query;
    const oldCars = await Car.find({
      carStatus: "Old",
      $or: [
        { kmsDriven: { $lte: kmsDriven } },
        { mileage: { $gte: runningAvgDaily } },
        { state: { state } },
      ],
    });
    res.json({ data: oldCars });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch old cars." });
  }
};

// const getUsedCar = async (req, res) => {
//   const UsedCarId = req.params.id;
//   console.log(UsedCarId);
//   try {
//     const usedCar = await UsedCar.findById(UsedCarId).populate("car");
//     if (!usedCar) {
//       return res.status(404).json({ error: "Used car not found" });
//     }
//     const oldCar = usedCar.car;
//     if (!oldCar) {
//       return res.status(404).json({ error: "Old car details not found" });
//     }
//     res.status(200).json({ data:[usedCar] });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get the used car" });
//   }
// };

const getAllUsedCar = async (req, res) => {
  try {
    const usedCars = await UsedCar.find().populate("Car");
    res.status(200).json({ data: usedCars });
  } catch (error) {
    res.status(500).json({ error: "Failed to get used cars" });
  }
};

const updateUsedCar = async (req, res) => {
  try {
    const updatedUsedCar = await UsedCar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUsedCar) {
      return res.status(404).json({ error: "Used car not found" });
    }
    res.status(200).json({ updatedUsedCar: updatedUsedCar });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the used car" });
  }
};

const deleteUsedCar = async (req, res) => {
  try {
    const usedCar = await UsedCar.findByIdAndDelete(req.params.id);
    if (!usedCar) {
      return res.status(404).json({ error: "Used car not found" });
    }
    res.status(200).json({ usedCar: usedCar });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the used car" });
  }
};

module.exports = {
  createUsedCar,
  // getUsedCar,
  getAllUsedCar,
  updateUsedCar,
  deleteUsedCar,
  getOldCars,
};
