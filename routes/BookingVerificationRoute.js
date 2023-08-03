const express = require("express");
const { createBooking, getBooking, getAllBooking, updateBooking, deleteBooking } = require("../controllers/BookingVerificationCtrl");
const router = express.Router();


router.post("/booking", createBooking);
router.get("/booking/:id", getBooking);
router.get("/booking", getAllBooking);
router.put("/booking/:id", updateBooking);
router.delete("/booking/:id", deleteBooking);

module.exports = router;