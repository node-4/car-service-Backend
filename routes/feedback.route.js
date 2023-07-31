const express = require("express");
const {
  getfeedback, 
  getAllfeedback,
  updatefeedback,
  deletefeedback,
  createFeedback,
  getfeedbackbyUser} = require("../controllers/feedbackCtrl");
const router = express.Router();

router.post("/feedback/create", createFeedback);
router.get("/feedback/:id", getfeedback);
router.get("/feedback", getAllfeedback);
router.put("/feedback/:id", updatefeedback);
router.delete("/feedback/:id", deletefeedback);
router.get("/user/feedback/:id", getfeedbackbyUser);


module.exports = router;