const Feedback = require('../models/feedbackModel');

const getAllfeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json({
      status: 200,
      message: "All feedbacks",
      data: feedbacks,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }

};

const getfeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
  } else {
    res.status(200).json(feedback);
  }
};

const getfeedbackbyUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const feedback = await Feedback.find({ userId });
    res.json({
      status: 200,
      message: "user feedback",
      data: feedback
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
}

const createFeedback = async (req, res) => {
  const feedback = new Feedback({
    userId: req.body.userId,
    feedback: req.body.feedback,
  });

  try {
    await feedback.save();
    res.status(201).json({
      message: "Feedback created",
      data: feedback
    });
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