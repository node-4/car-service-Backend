const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        about: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            default: "Vendor",
        },
        garageName: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Vendor", userSchema);
