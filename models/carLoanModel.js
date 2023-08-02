const mongoose = require("mongoose");

const carLoanSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  emiCalculator: {
    downPayment: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    loanPeriod: {
      type: Number,
      required: true,
    },
    monthlyEMI: {
      type: Number,
      required: true,
    },
    totalLoanAmount: {
      type: Number,
      required: true,
    },
    payableAmount: {
      type: Number,
      required: true,
    },
  },
});

const CarLoan = mongoose.model("CarLoan", carLoanSchema);

module.exports = CarLoan;
