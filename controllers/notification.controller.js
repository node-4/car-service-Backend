const Notification = require("../models/notification");

exports.createNotification = async (req, res) => {
    try {
        const { userIds, vendorIds, message } = req.body;
        const newNotification = new Notification({
            userId: userIds,
            VendorId: vendorIds,
            message: message,
        });
        await newNotification.save();
        createResponse(
            res,
            201,
            "Notification created successfully",
            newNotification
        );
    } catch (error) {
        createResponse(res, 500, error.message);
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
            .sort(-createdAt)
            .lean();
        createResponse(
            res,
            200,
            "Notifications fetched successfully",
            notifications
        );
    } catch (error) {
        createResponse(res, 500, error.message);
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
            return createResponse(res, 404, "Notification not found");
        }
        createResponse(res, 200, "Notification marked as read", notification);
    } catch (error) {
        createResponse(res, 500, error.message);
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
            return exports.createResponse(res, 404, "Notification not found");
        }
        exports.createResponse(
            res,
            200,
            "Notification updated successfully",
            notification
        );
    } catch (error) {
        exports.createResponse(res, 500, error.message);
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return exports.createResponse(res, 404, "Notification not found");
        }
        exports.createResponse(res, 200, "Notification deleted successfully");
    } catch (error) {
        exports.createResponse(res, 500, error.message);
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return exports.createResponse(res, 404, "Notification not found");
        }
        exports.createResponse(
            res,
            200,
            "Notification fetched successfully",
            notification
        );
    } catch (error) {
        exports.createResponse(res, 500, error.message);
    }
};
