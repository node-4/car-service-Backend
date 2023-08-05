const mongoose = require("mongoose");
const carComparisonModel = require("../models/CarComparisonModel");
const Car = require("../models/car.model");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
    },
    mobile: {
      type: String,
      // required: true,
    },
    carModel: {
      type: String,
      //     required: true,
    },
    carNumber: {
      type: String,
      //     required: true,
    },
    fuel: {
      type: String,
      //     required: true,
    },
    otp: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["user", "mechanic"],
      default: "user"
    }
  },
  { timestamps: true }
);



userSchema.pre("save", function (next) {
  if (!this.fullName || !this.mobile) {
    const err = new Error("All fields are required.");
    return next(err);
  }
  next();
});


userSchema.methods.compareCars = async function (car1Id, car2Id) {
  try {
    const car1 = await Car.findById(car1Id)
      .populate("manufacturer")
      .populate("model")
      .populate("fuelType")
      .populate("bodyType")
      .populate("variant")
      .exec();

    const car2 = await Car.findById(car2Id)
      .populate("manufacturer")
      .populate("model")
      .populate("fuelType")
      .populate("bodyType")
      .populate("variant")
      .exec();

    if (!car1 || !car2) {
      throw new Error("One or both cars not found");
    }

    const carComparison = new carComparisonModel({
      user: this._id,
      car1: car1Id,
      car2: car2Id,
      car1Details: car1.toObject(),
      car2Details: car2.toObject(),
    });

    await carComparison.save();

    return carComparison;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);