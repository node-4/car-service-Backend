const User = require("../models/user.model");
const Car = require("../models/car.model");
const CarComparison = require("../models/CarComparisonModel")

// router.post("/compare/:userId",
const compareCarsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { car1Id, car2Id } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const car1 = await Car.findById(car1Id)

    // const car2 = await Car.findById(car2Id)

    // if (!car1 || !car2) {
    //   return res.status(404).json({ message: "One or both cars not found" });
    // }

    const comparisonResult = await user.compareCars(car1Id, car2Id);

    return res.json({data:[comparisonResult]});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  const getComparison = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const latestComparison = await CarComparison.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("car1Details.car")
      .populate("car2Details.car")
      .exec();

    if (!latestComparison) {
      return res
        .status(404)
        .json({ message: "No comparison found for the user" });
    }

    return res.json({data:latestComparison});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  compareCarsByUser,
  getComparison,
};