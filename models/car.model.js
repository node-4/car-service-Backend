const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        manufacturer: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        bodyType: {
            type: String,
            required: true,
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
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        transmission: {
            type: String,
            required: true,
        },
        fuelType: {
            type: String,
            required: true,
        },
        engineSize: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        kmDriven: {
            type: Number,
            // required: true,
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
// carSchema.pre("save", function (next) {
//     if (
//         !this.manufacturer ||
//         !this.model ||
//         !this.year ||
//         !this.color ||
//         !this.mileage ||
//         !this.transmission ||
//         !this.fuelType ||
//         !this.engineSize ||
//         !this.price ||
//         !this.carStatus ||
//         !this.state ||
//         !this.city ||
//         !this.variant
//     ) {
//         return next(new Error("All fields are required"));
//     }
//     next();
// });

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
