const mongoose = require("mongoose");
const moment = require("moment-timezone");
const indiaTime = moment.tz(Date.now(), "Asia/Kolkata");
const subscriptionPlanSchema = new mongoose.Schema({
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
        // required: true,
    },
    duration: {
        type: String,
        // required: true,
        default: "1",
    },
    serviceId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Service",
        },
    ],
    is_active: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: moment
            .tz(Date.now(), "Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss"),
    },
    updatedAt: {
        type: String,
        default: () => {
            return moment
                .tz(Date.now(), "Asia/Kolkata")
                .format("YYYY-MM-DD HH:mm:ss");
        },
    },
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
