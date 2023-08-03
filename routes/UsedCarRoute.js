const express = require("express");
const {
  createUsedCar,
  // getUsedCar,
  getAllUsedCar,
  updateUsedCar,
  deleteUsedCar,
  getOldCars,
} = require("../controllers/UsedCarCtrl");
const router = express.Router();

router.post("/create/usedcar", createUsedCar);
// router.get("/usedcar/:id", getUsedCar);
router.get("/usedcar/old", getOldCars);
router.get("/usedcar", getAllUsedCar);
router.put("/usedcar/update/:id", updateUsedCar);
router.delete("/usedcar/:id", deleteUsedCar);


module.exports = router;