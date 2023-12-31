const Booking = require("../models/BookingVerificationModel");

const createBooking = async (req, res) => {
  try {
    const userId = req.body.userId;
    const carId = req.body.carId;
    const appointment = new Booking({
      userId,
      carId,
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      availability: req.body.availability,
      date: req.body.date,
      time: req.body.time,
    });

    // Check if the user has already booked the car on the same date and time
    const existingBooking = await Booking.findOne({
      userId,
      carId,
      date: appointment.date,
      time: appointment.time,
    });

    if (existingBooking) {
      throw new Error("User has already booked this car on this date and time");
    }

    appointment.save();
    res.status(201).json({ data: appointment });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

const getBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    res.status(201).json({ data: booking })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    res.status(201).json({ data: booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    res.status(201).json({ data: booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBooking = async (req, res) => {
   const bookingId = req.params.id;
   const updatedBooking = req.body;
  try {
        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          updatedBooking,
          {
            new: true,
          }
        );
    res.status(201).json({ data: booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getBooking,
  getAllBooking,
  deleteBooking,
  updateBooking,
};