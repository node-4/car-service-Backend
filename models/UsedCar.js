const mongoose = require("mongoose");

const usedCarSchema = new mongoose.Schema({
    planningToBuy: {
      type: String,
      enum: [
        "Immediate",
        "0-1 months",
        "1-3 months",
        "3-6 months",
        "Just Looking Around",
      ],
    },
    kmsDriven: {
      type: Number,
    },
    carFor: {
      type: String,
    },
    city: {
      type: String,
    },
    runningAvgDaily: {
      type: Number,
    },
  },
  { timestamps: true }
);


const UsedCar = mongoose.model("UsedCar", usedCarSchema);

module.exports = UsedCar;
