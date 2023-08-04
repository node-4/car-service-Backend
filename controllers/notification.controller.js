const Notification = require("../models/notification");

exports.createNotification = async (req, res) => {
  try {
    const { userIds, vendorIds, message } = req.body;
    const newNotification = new Notification({
      userId: userIds,
      vendorId: vendorIds,
      message: message,
    });
    await newNotification.save();
    res.status(200).json({
      message: "Notification created successfully",
      data: newNotification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    let queryObj = {};
    if (req.query.userId) {
      queryObj.userId = req.query.userId;
    }
    if (req.query.vendorId) {
      queryObj.vendorId = req.query.vendorId;
    }
    const notifications = await Notification.find(queryObj)
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { is_read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json({
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { message: message },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json({
      message: "Notification updated successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json({
      message: "Notification fetched successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};