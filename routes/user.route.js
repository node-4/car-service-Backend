const express = require("express");
const router = express.Router();

const {
    sendOtp,
    verifyOtpById,
    createUser,
    updateUser,
    getUserById,
    deleteUser,
    getUsers,
} = require("../controllers/user.controller");
const { authJwt, objectId } = require("../middlewares");
router.post("/auth/send-otp", sendOtp);
router.post("/auth/signup", createUser);
router.patch("/users/:id", [authJwt.verifyToken, objectId.validId], updateUser);
router.get("/users/:id", [objectId.validId], getUserById);
router.delete(
    "/users/:id",
    [authJwt.verifyToken, objectId.validId],
    deleteUser
);
router.get("/users", getUsers);
// Route to verify the OTP entered by the user
router.post("/auth/verify-otp/:id", verifyOtpById);

module.exports = router;
