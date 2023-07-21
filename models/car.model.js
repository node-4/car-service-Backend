const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const carSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        manufacturer: {
            type: String,
        },
        model: {
            type: String,
        },
        year: {
            type: Number,
        },
        bodyType: {
            type: String,
        },
        variant: {
            type: String,
        },
        carStatus: {
            type: String,
            //     required: true,
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
        fuelType: {
            type: String,
        },
        engineSize: {
            type: String,
        },
        price: {
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
