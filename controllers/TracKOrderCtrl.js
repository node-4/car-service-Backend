const TrackOrder = require("../models/TrackOrderModel");
const mongoose = require("mongoose");

exports.createTrackOrder = async (req, res) => {
  try {
    const { car, bookingId, vendor, date, estimatedCompletion, status } =
      req.body;
    const image = req.file.path;

    const newOrder = new TrackOrder({
      car,
      bookingId,
      vendor,
      date,
      estimatedCompletion,
      image,
      progress: [{ status, timestamp: new Date() }],
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrackOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await TrackOrder.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTrackOrder = async (req, res) => {
  try {
      const orders = await TrackOrder.find();
      res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const statusMapping = {
  1: "New Parts Arrived",
  2: "Installation In Progress",
  3: "Final Inspection",
  4: "Ready for Drop",
  5: "Dropped",
};


exports.updateTrackOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const existingOrder = await TrackOrder.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    existingOrder.progress.push({ status, timestamp: new Date() });

    await existingOrder.save();

    res.json({ message: "Order updated successfully", data: existingOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrackOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  await order.remove();
  res.status(200).json({ message: "Order deleted" });
};

