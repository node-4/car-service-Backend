const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq");

router.post("/faqs", faqController.createFaq);
router.get("/faqs", faqController.getFaqs);
router.get("/faqs/:id", faqController.getFaq);
router.put("/faqs/:id", faqController.updateFaq);
router.delete("/faqs/:id", faqController.deleteFaq);

module.exports = router;
