const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "carServiceOrder",
        required: true,
        default: 0,
    },
    receiptId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true, default: "pending" },
    order_id: { type: String },
    amount: { type: Number, required: true },
    date: { type: String, default: Date.now },
    discountCoupon: { type: Schema.Types.ObjectId, ref: "DiscountCoupon" },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
