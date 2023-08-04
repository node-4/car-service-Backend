const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    image: {
      type: String,
    },
    bookingId: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    estimatedCompletion: {
      type: Date,
      required: true,
    },
    progress: {
      type: [
        {
          status: {
            type: String,
            enum: [
              "New Parts Arrived",
              "Installation In Progress",
              "Final Inspection",
              "Ready for Drop",
              "Dropped",
            ],
            required: true,
          },
          timestamp: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
