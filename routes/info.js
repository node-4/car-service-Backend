const express = require("express");
const router = express.Router();
const infoController = require("../controllers/info");

// Route to handle creating a new Info document
router.post("/info", infoController.createInfo);

// Route to handle retrieving all Info documents
router.get("/info", infoController.getInfo);

// Route to handle updating an Info document by ID
router.put("/info/:id", infoController.updateInfo);

// Route to handle deleting an Info document by ID
router.delete("/info/:id", infoController.deleteInfo);

module.exports = router;
