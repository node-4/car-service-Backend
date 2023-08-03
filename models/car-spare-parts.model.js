const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carSparePartSchema = new Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: String,
            // required: true,
        },
        discountedPrice: {
            type: String,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },

        image: {
            type: String,
            // required: true,
        },
        car: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CarSparePart", carSparePartSchema);
