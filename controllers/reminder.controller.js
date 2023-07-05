const Reminder = require("../models/reminder");

// Create a new reminder
exports.createReminder = (req, res) => {
    const { title, description, date, userId } = req.body;
    const reminder = new Reminder({
        title: title,
        description: description,
        date: date,
        user: userId,
    });
    reminder
        .save()
        .then(() => {
            // Schedule the reminder
            agenda.schedule(date, "send reminder", {
                reminderId: reminder._id.toString(),
            });
            res.sendStatus(201);
        })
        .catch((err) => res.status(500).send(err.message));
};

const admin = require("firebase-admin");

// Initialize the Firebase admin SDK with your service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function sendReminderNotification(req, res) {
    try {
        const { userToken, title, body } = req.body;

        // Define the notification payload
        const payload = {
            notification: {
                title,
                body,
            },
        };

        // Send the notification to the user's device
        await admin.messaging().sendToDevice(userToken, payload);

        res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
