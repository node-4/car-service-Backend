const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountCouponSchema = new Schema({
    code: { type: String, required: true },
    description: { type: String },
    minimumPurchase: { type: Number, required: true },
    maximumDiscount: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    is_active: { type: Boolean, default: false },
    validFrom: { type: Date },
    validUntil: { type: Date },
});

const DiscountCoupon = mongoose.model("DiscountCoupon", discountCouponSchema);
module.exports = DiscountCoupon;
