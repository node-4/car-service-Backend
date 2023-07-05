const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceSchema = new Schema(
    {
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Vendor",
        },
        images: {
            type: [String],
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        price: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        services: {
            type: [Object],
            required: true,
        },
        rating: {
            type: String,
            default: "unrated",
        },
    },
    { timestamps: true }
);
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
