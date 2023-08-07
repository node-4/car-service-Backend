const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackOrderSchema = new Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    image: {
      type: String,
    },
    bookingId: {
      type: String,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    date: {
      type: Date,
    },
    estimatedCompletion: {
      type: Date,
    },
    pickup: {
      type: String,
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
    
          },
          timestamp: {
            type: Date,
    
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const TrackOrder = mongoose.model("TrackOrder", TrackOrderSchema);

module.exports = TrackOrder;
