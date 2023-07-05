const express = require("express");
const router = express.Router();
const subscriptionPlanController = require("../controllers/subscriptionPlanController");

router.post(
    "/subscription-plan",
    subscriptionPlanController.createSubscriptionPlan
);
router.get(
    "/subscription-plan/:id",
    subscriptionPlanController.getSubscriptionPlanById
);
router.put(
    "/subscription-plan/:id",
    subscriptionPlanController.updateSubscriptionPlan
);
router.delete(
    "/subscription-plan/:id",
    subscriptionPlanController.deleteSubscriptionPlan
);

module.exports = router;
