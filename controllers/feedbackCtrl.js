const Feedback = require('../models/feedbackModel');

const getAllfeedback = async (req, res) => {
  const feedbacks = await Feedback.find();
  res.status(200).json(feedbacks);
};

const getfeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
  } else {
    res.status(200).json(feedback);
  }
};

const
  getfeedbackbyUser = async (req, res) => {
  const userId = req.params.id
  console.log(userId)
  const feedback = await Feedback.findById(userId);
  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
  } else {
    res.status(200).json(feedback);
  }
}

const createFeedback = async (req, res) => {
  const feedback = new Feedback({
    userId: req.body.userId,
    feedback: req.body.feedback,
  });

  try {
    await feedback.save();
    res.status(201).json({ message: "Feedback created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const updatefeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
  } else {
    feedback.userId = req.body.userId;
    feedback.feedback = req.body.feedback;

    try {
      await feedback.save();
      res.status(200).json({ message: "Feedback updated" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

const deletefeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
  } else {
    await feedback.remove();
    res.status(200).json({ message: "Feedback deleted" });
  }
}


module.exports = {
  getAllfeedback,
  getfeedback,
  createFeedback,
  updatefeedback,
  deletefeedback,
  getfeedbackbyUser,
};