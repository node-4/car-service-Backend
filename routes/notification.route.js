const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.post("/notifications", notificationController.createNotification);
router.get("/notifications", notificationController.getNotifications);
router.patch("/notifications/:id/read", notificationController.markAsRead);
router.get("/notifications/:id", notificationController.getNotificationById);
router.put("/notifications/:id", notificationController.updateNotification);
router.delete("/notifications/:id", notificationController.deleteNotification);

module.exports = router;
