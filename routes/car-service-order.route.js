const express = require("express");
const router = express.Router();
const {
    createCarServiceOrder,
    getCarServiceOrders,
    getCarServiceOrderById,
    updateCarServiceOrderById,
    deleteCarServiceOrderById,
} = require("../controllers/car-service-order");

router.post("/car-service-orders", createCarServiceOrder);
router.get("/car-service-orders", getCarServiceOrders);
router.get("/car-service-orders/:id", getCarServiceOrderById);
router.put("/car-service-orders/:id", updateCarServiceOrderById);
router.delete("/car-service-orders/:id", deleteCarServiceOrderById);

module.exports = router;
