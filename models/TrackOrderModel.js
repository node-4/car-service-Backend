const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackOrderSchema = new Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
    },
    image: {
      type: String,
    },
    bookingId: {
      type: String,
      // required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
    },
    estimatedCompletion: {
      type: Date,
      // required: true,
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
            // required: true,
          },
          timestamp: {
            type: Date,
            // required: true,
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
