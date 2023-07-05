const mongoose = require("mongoose");
const moment = require("moment-timezone");

const reviewSchema = new mongoose.Schema({
    carServiceOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CarServiceOrder",
    },
    carServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Service",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: () =>
            moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss"),
    },
    updatedAt: {
        type: String,
        default: () =>
            moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss"),
    },
});

reviewSchema.pre("save", function (next) {
    this.updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    next();
});

module.exports = mongoose.model("car-service-order-review", reviewSchema);
