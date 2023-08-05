const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    distance: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Road-Assistance", ServiceSchema);
