const mongoose = require("mongoose");
const moment = require("moment-timezone");
const indiaTime = moment.tz(Date.now(), "Asia/Kolkata");
const date = indiaTime.format("DD-MM-YYYY");
const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "User",
        },
        VendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            // required: true,
        },
        message: {
            type: String,
            required: true,
        },
        is_read: {
            type: Boolean,
            default: false,
        },
        date: {
            type: String,
            default: indiaTime.format("DD-MM-YYYY"),
        },
        time: {
            type: String,
            default: indiaTime.format("hh:mm:ss"),
        },
    },
    { timestamps: true }
);
notificationSchema.index({ userId: 1, VendorId: 1 });

module.exports = mongoose.model("Notification", notificationSchema);
