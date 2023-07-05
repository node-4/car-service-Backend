const express = require("express");
const router = express.Router();
const accessoriesController = require("../controllers/accessories");

// GET all accessories
router.get("/accessories", accessoriesController.getAllAccessories);

// GET an accessory by ID
router.get("/accessories/:id", accessoriesController.getAccessoryById);
router.put("/accessories/:id", accessoriesController.updateAccessory);
router.delete("/accessories/:id", accessoriesController.deleteAccessory);
// CREATE a new accessory
router.post("/accessories", accessoriesController.createAccessory);

module.exports = router;
