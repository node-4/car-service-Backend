const TrackOrder = require("../models/TrackOrderModel");


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
    let findCar = await TrackOrder.findById(id).populate([
      {
        path: "car",
        populate: [
          {
            path: "manufacturer",
            model: "brand",
            select: "name",
          },
          {
            path: "model",
            model: "bodyfuelmodelvarient",
            select: "model",
          },
          {
            path: "fuelType",
            model: "bodyfuelmodelvarient",
            select: "fuelType",
          },
          {
            path: "bodyType",
            model: "bodyfuelmodelvarient",
            select: "bodyType",
          },
          {
            path: "variant",
            model: "bodyfuelmodelvarient",
            select: "variant",
          },
        ],
      },
      {
        path: "vendor",
      },
    ]);

    if (!findCar) {
      return res.status(404).json({ error: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order fetched successfully", data: findCar });
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

exports.updateTrackOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateFields = req.body;
    const existingOrder = await TrackOrder.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    Object.assign(existingOrder, updateFields);

    const updatedOrder = await existingOrder.save();

    res.json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the order." });
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
