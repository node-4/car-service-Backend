const mongoose = require("mongoose");
const infoSchema = new mongoose.Schema(
    {
        aboutUs: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        },
        contactUs: {
            email: {
                type: String,
                default: "",
                required: true,
            },
            message: {
                type: String,
                default: "",
            },
            address: {
                type: String,
                default: "",
            },
            phone: {
                type: String,
                default: "",
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Info", infoSchema);

