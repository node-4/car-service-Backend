const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/road-assistance");
const { authJwt, objectId } = require("../middlewares");
// GET all services
router.get("/services", serviceController.getAllServices);

// GET a service by ID
router.get(
    "/services/:id",
    [objectId.validId],
    serviceController.getServiceById
);

// CREATE a new service
router.post(
    "/services",
    [authJwt.verifyToken],
    serviceController.createService
);

module.exports = router;
