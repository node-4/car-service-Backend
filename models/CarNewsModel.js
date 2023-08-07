const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carNewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamp: true }
);

const CarNews = mongoose.model("CarNews", carNewsSchema);

module.exports = CarNews;
