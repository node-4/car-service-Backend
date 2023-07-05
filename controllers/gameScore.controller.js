// Import the LudoScore model
const LudoScore = require("../models/gameScore.model");

// GET all Ludo scores
exports.getAllLudoScores = async (req, res) => {
    try {
        const ludoScores = await LudoScore.find();
        if (ludoScores.length === 0) throw Error("score not found");
        res.status(200).json(ludoScores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single Ludo score by ID
exports.getOneLudoScore = async (req, res) => {
    try {
        const ludoScore = await LudoScore.findById(req.params.id);
        if (!ludoScore) throw Error("Ludo score not found");
        res.status(200).json(ludoScore);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE a new Ludo score
exports.createLudoScore = async (req, res) => {
    const ludoScore = new LudoScore({
        userId: req.body.userId,
        gameId: req.body.gameId,
        score: req.body.score,
    });
    try {
        const newLudoScore = await ludoScore.save();
        res.status(201).json(newLudoScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a Ludo score by ID
exports.updateLudoScore = async (req, res) => {
    try {
        const ludoScore = await LudoScore.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!ludoScore) throw Error("Ludo score not found");

        res.status(200).json(ludoScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a Ludo score by ID
exports.deleteLudoScore = async (req, res) => {
    try {
        const ludoScore = await LudoScore.findByIdAndDelete(req.params.id);
        if (!ludoScore) throw Error("Ludo score not found");

        res.status(200).json({ message: "Ludo score deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.leaderBoard = async (req, res) => {
    const { interval } = req.query;

    let dateFilter;
    switch (interval) {
        case "weekly":
            dateFilter = {
                $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            };
            break;
        case "monthly":
            dateFilter = {
                $gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
                ),
            };
            break;
        case "yearly":
            dateFilter = { $gte: new Date(new Date().getFullYear(), 0, 1) };
            break;
        default:
            return res.status(400).json({ message: "Invalid interval." });
    }

    try {
        const aggregateResult = await LudoScore.aggregate([
            { $match: { createdAt: dateFilter } },
            { $group: { _id: "$userId", totalScore: { $sum: "$score" } } },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    "user._id": 0,
                    "user.password": 0,
                    "user.email": 0,
                },
            },
        ]);

        res.json({ data: aggregateResult });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred." });
    }
};
