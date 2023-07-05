const express = require("express");
const router = express.Router();
const termsController = require("../controllers/terms.controller");
const { authJwt, objectId } = require("../middlewares");
// Route for getting the current terms and conditions
router.get("/terms", termsController.getTerms);

// Route for creating a new set of terms and conditions
router.post("/terms", termsController.createTerms);

// Route for updating a set of terms and conditions
router.put("/terms/:id", [objectId.validId], termsController.updateTerms);

// Route for deleting a set of terms and conditions
router.delete("/terms/:id", [objectId.validId], termsController.deleteTerms);

module.exports = router;
