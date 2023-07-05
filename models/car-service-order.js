const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const carServiceOrderSchema = new Schema(
    {
        carServiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        },
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            //     required: true,
        },
        amount: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", "Completed"],
            default: "Pending",
        },
        rating: {
            type: String,
            default: "unrated",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("CarServiceOrder", carServiceOrderSchema);
