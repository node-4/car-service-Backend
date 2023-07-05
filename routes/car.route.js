const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");
const upload = require("../services/uploadImage");

const { authJwt, objectId } = require("../middlewares");
// Get all cars
router.get("/cars", carController.getAllCars);

// Create a new car
router.post(
    "/cars",
    [authJwt.verifyToken, upload.single("file")],
    carController.createCar
);
router.post("/admin/cars", [authJwt.verifyToken], carController.createCar);
// Get a specific car
router.get("/cars/:id", carController.getCar);
router.get("/recommendedcars", carController.getRecommendedCars);
// Update a car
router.patch(
    "/cars/:id",
    [authJwt.verifyToken, objectId.validId],
    carController.updateCar
);
router.patch(
    "/admin/cars/:id",
    [authJwt.verifyToken, objectId.validId],
    carController.updateCar
);
router.delete(
    "/admin/cars/:id",
    [authJwt.verifyToken, objectId.validId],
    carController.deleteCar
);

// Delete a car
router.delete(
    "/cars/:id",
    [authJwt.verifyToken, objectId.validId],
    carController.deleteCar
);

router.get("/compare-cars", carController.compareCars1);
module.exports = router;
