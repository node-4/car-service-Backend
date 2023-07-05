const express = require("express");
const router = express.Router();
const helpAndSupportController = require("../controllers/helpAndSupportController");

router.post(
    "/help-and-supports",
    helpAndSupportController.createHelpAndSupport
);
router.get("/help-and-supports", helpAndSupportController.getHelpAndSupports);
router.get(
    "/help-and-supports/:id",
    helpAndSupportController.getHelpAndSupport
);
router.put(
    "/help-and-supports/:id",
    helpAndSupportController.updateHelpAndSupport
);
router.delete(
    "/help-and-supports/:id",
    helpAndSupportController.deleteHelpAndSupport
);

module.exports = router;
