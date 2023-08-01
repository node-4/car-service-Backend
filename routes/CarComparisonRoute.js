const express = require("express");
const { compareCarsByUser, getComparison } = require("../controllers/CarComparisonCtrl");
const router = express.Router();

router.post("/compare/:userId", compareCarsByUser);
router.get("/compare/:userId", getComparison);

module.exports = router;