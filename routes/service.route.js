const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    getPriceWithDiscount,
} = require("../controllers/car-service.controller");

// Create a new service
router.post("/car-services", createService);

// Get all services
router.get("/car-services", getAllServices);

// Get a single service by ID
router.get("/car-services/:id", getServiceById);

// Update a service by ID
router.put("/car-services/:id", updateServiceById);

// Delete a service by ID
router.delete("/car-services/:id", deleteServiceById);
router.post("/car-services-discount", getPriceWithDiscount);
module.exports = router;
