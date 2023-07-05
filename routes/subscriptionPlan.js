const express = require("express");
const router = express.Router();
const subscriptionPlanController = require("../controllers/subscriptionPlan");

router.post("/subscription-plan", subscriptionPlanController.createService);
router.get("/subscription-plan/:id", subscriptionPlanController.getServiceById);
router.get("/subscription-plan", subscriptionPlanController.getServices);
router.put(
    "/subscription-plan/:id",
    subscriptionPlanController.updateServiceById
);
router.delete(
    "/subscription-plan/:id",
    subscriptionPlanController.deleteServiceById
);

module.exports = router;
