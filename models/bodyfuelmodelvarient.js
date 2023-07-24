const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    bodyType: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    model: {
        type: String,
    },
    variant: {
        type: String,
    },
    type:{
        type: String,
        enum: ["BODYTYPE","FUELTYPE","MODEL","VARIENT"]
    }
}, { timestamps: true });
const brand = mongoose.model("bodyfuelmodelvarient", brandSchema);
module.exports = brand;