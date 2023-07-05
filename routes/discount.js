const express = require("express");
const router = express.Router();
const discountCouponController = require("../controllers//discountCouponControlller");

router.post("/discount-coupons", discountCouponController.createDiscountCoupon);
router.get("/discount-coupons", discountCouponController.getDiscountCoupons);
router.get("/discount-coupons/:id", discountCouponController.getDiscountCoupon);
router.put(
    "/discount-coupons/:id",
    discountCouponController.updateDiscountCoupon
);
router.delete(
    "/discount-coupons/:id",
    discountCouponController.deleteDiscountCoupon
);

module.exports = router;
