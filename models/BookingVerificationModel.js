const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Car",
  },
  name: {
    type: String,
    // required: true,
  },
  phonenumber: {
    type: String,
    // required: true,
  },
  availability: {
    type: Boolean,
    // required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  time: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
