const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: String,
    tokens: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
        },
    ],
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
