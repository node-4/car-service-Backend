const TrackOrder = require("../models/TrackOrderModel");

exports.createTrackOrder = async (req, res) => {
  try {
    const { car, bookingID, manufacturer, date, estimatedCompletion } = req.body;
    const image = req.file.path;
    const newOrder = new TrackOrder({
      car,
      bookingID,
      manufacturer,
      date,
      image,
      estimatedCompletion,
      orderStatus: "New Parts Arrived",
      orderHistory: [{ status: "New Parts Arrived", timestamp: new Date() }],
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrackOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTrackOrder = async (req, res) => {
  const orders = await TrackOrder.find();

  res.status(200).json(orders);
};

exports.updateTrackOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (
      ![
        "New Parts Arrived",
        "Installation In Progress",
        "Final Inspection",
        "Ready for Drop",
        "Dropped",
      ].includes(orderStatus)
    ) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus = orderStatus;
    order.orderHistory.push({ status: orderStatus, timestamp: new Date() });
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", data: order });
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

