const mongoose = require("mongoose");

const carComparisonSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    car2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    car1Details: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    car2Details: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const CarComparison = mongoose.model("CarComparison", carComparisonSchema);

module.exports = CarComparison;
