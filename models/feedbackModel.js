const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: String },
    feedback: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);