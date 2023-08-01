const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const carSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bodyfuelmodelvarient",
    },
    fuelType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bodyfuelmodelvarient",
    },
    bodyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bodyfuelmodelvarient",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bodyfuelmodelvarient",
    },
    year: {
      type: Number,
    },
    carStatus: {
      type: String,
    },
    color: {
      type: String,
    },
    mileage: {
      type: Number,
    },
    transmission: {
      type: String,
    },
    engineSize: {
      type: String,
    },
    price: {
      type: Number,
    },
    exPrice: {
      type: Number,
    },
    rto: {
      type: Number,
    },
    insuracnce: {
      type: Number,
    },
    description: {
      type: String,
    },
    othersCharges: {
      type: Number,
    },
    kmDriven: {
      type: Number,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
carSchema.plugin(mongoosePaginate);
carSchema.plugin(mongooseAggregatePaginate);
const Car = mongoose.model("Car", carSchema);
module.exports = Car;
