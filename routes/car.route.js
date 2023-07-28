const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");
// const upload = require("../services/uploadImage");
const multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
        cloud_name: "dbrvq9uxa",
        api_key: "567113285751718",
        api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
                folder: "images/Car",
                allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "avif"],
        },
});
const upload = multer({ storage: storage });
const { authJwt, objectId } = require("../middlewares");
// Get all cars
router.get("/cars", carController.getAllCars);
router.get("/allCarsget", carController.allCarsget);

// Create a new car
router.post("/cars",
// [authJwt.verifyToken, 
    upload.single("file"),
// ],


carController.createCar);
router.post("/admin/cars", [authJwt.verifyToken], carController.createCar);
router.post('/getSimilarCars', carController.getSimilarCars);

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

router.get("/compare-cars", carController.compareCars);

router.get('/carsByYear/:year', carController.getCarsByYear);
router.get('/fuelTypes/:carId', carController.getFuelTypes);
router.get('/kmDrivenValues/:carId', carController.getKmDrivenValues);


module.exports = router;
