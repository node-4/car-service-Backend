const mongoose = require("mongoose");

const ludoScoreSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        gameId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LudoGame",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("LudoScore", ludoScoreSchema);
