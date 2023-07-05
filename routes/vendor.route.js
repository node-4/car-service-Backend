const express = require("express");
const router = express.Router();
const { validateBodies } = require("../middlewares");
const {
    signup,
    login,
    getVendors,
    getVendor,
    deleteVendor,
    updateVendor,
} = require("../controllers/vendor.controller");

router.post(
    "/auth/vendors/signup",
    [validateBodies.validateRequiredFields],
    signup
);
router.post("/auth/vendors/login", login);
router.get("/vendors/:id", getVendor);
router.get("/vendors", getVendors);
router.put("/vendors/:id", updateVendor);
router.delete("/vendors/:id", deleteVendor);

module.exports = router;
