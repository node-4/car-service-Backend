const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Route for admin signup
router.post("/admin/signup", adminController.signup);

// Route for admin login
router.post("/admin/login", adminController.login);

// Retrieve all admins
router.get("/admins", adminController.getAllAdmins);

// Retrieve a single admin with id
router.get("/admins/:id", adminController.getAdminById);

// Update an admin with id
router.put("/admins/:id", adminController.updateAdmin);

// Delete an admin with id
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;
