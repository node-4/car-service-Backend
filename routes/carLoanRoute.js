const express = require("express");
const { CreateCarLoan, getCarLoan, getAllCarLoan, updateCarLoan, deleteCarLoan } = require("../controllers/carLoanCtrl");
const router = express.Router();

router.post("/create/loan", CreateCarLoan);
router.get("/loan/:id", getCarLoan);
router.get("/loan", getAllCarLoan);
router.put("/update/loan", updateCarLoan);
router.delete("/delete/loan", deleteCarLoan);

module.exports = router;
