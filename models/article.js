const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            required: true,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
    },
    { timestamp: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
