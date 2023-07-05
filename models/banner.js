const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    linkUrl: { type: String },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
