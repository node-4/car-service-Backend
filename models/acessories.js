const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accessoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
        },
    },
    { timestamps: true }
);

const Accessories = mongoose.model("Accessories", accessoriesSchema);
module.exports = Accessories;
