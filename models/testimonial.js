const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
