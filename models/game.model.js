const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
    ],
    currentPlayerIndex: {
        type: Number,
        default: 0,
    },
    state: {
        type: String,
        enum: ["waiting", "in_progress", "finished"],
        default: "waiting",
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        default: null,
    },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
