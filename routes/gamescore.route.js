const router = require("express").Router();

const {
    createLudoScore,
    getAllLudoScores,
    getOneLudoScore,
    updateLudoScore,
    deleteLudoScore,
} = require("../controllers/gameScore.controller");

router.post("/gameScore", createLudoScore);
router.get("/gameScore", getAllLudoScores);
router.get("/gameScore/:id", getOneLudoScore);
router.patch("/gameScore/:id", updateLudoScore);
router.delete("/gameScore/:id", deleteLudoScore);
router.get("/leaderboard", leaderBoard);

module.exports = router;
