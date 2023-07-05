const express = require("express");
const router = express.Router();
const carSparePartController = require("../controllers/spare-parts.controller");

router.post("/spare-parts", carSparePartController.createCarSparePart);
router.get("/spare-parts", carSparePartController.getCarSpareParts);
router.get("/spare-parts/:id", carSparePartController.getCarSparePart);
router.put("/spare-parts/:id", carSparePartController.updateCarSparePart);
router.delete("/spare-parts/:id", carSparePartController.deleteCarSparePart);

module.exports = router;
