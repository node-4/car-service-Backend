const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, accessTokenTime } = require("../configs/auth.config");
const generateOTP = require("../utils/otp-generate");
// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) throw new Error("No users found");
        res.json({ data: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const otp = generateOTP();
    let otps = bcrypt.hashSync(otp, 8);
    const user = new User({
        fullName: req.body.fullName,
        mobile: req.body.mobile,
        carModel: req.body.carModel,
        carNumber: req.body.carNumber,
        fuel: req.body.fuel,
        otp: otps
    });

    try {
        const newUser = await user.save();
        let obj2 = {
            _id: newUser._id,
            fullName: req.body.fullName,
            mobile: req.body.mobile,
            carModel: req.body.carModel,
            carNumber: req.body.carNumber,
            fuel: req.body.fuel,
            otp: otp
        }
        res.status(201).json({
            status: 200,
            message: "signed up successfully",
            data: obj2,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user by id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.fullName = req.body.fullName || user.fullName;
        user.mobile = req.body.mobile || user.mobile;
        user.carModel = req.body.carModel || user.carModel;
        user.carNumber = req.body.carNumber || user.carNumber;
        user.fuel = req.body.fuel || user.fuel;

        const updatedUser = await user.save();
        res.json({ message: updated, data: updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.sendOtp = async (req, res) => {
    const { mobile } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ mobile });

        // if user doesn't exist create new user
        if (!user) throw new Error("not registered");
        // generate OTP and save it in user document
        const otp = generateOTP();
        user.otp = bcrypt.hashSync(otp, 8);
        await user.save();

        // send OTP via SMS
        // const message = `Your OTP for MyApp is ${otp}.`;
        // sendOTP(mobile, message);

        res.status(200).json({
            message: "OTP sent successfully",
            otp: otp,
            userId: user._id,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.verifyOtpById = async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(typeof user.otp, typeof otp);
        if (bcrypt.compareSync(user.otp, otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Clear OTP after successful verification
        user.otp = null;
        await user.save();
        const accessToken = jwt.sign({ id: user._id }, secret, {
            expiresIn: accessTokenTime,
        });
        return res.json({
            message: "OTP verified successfully",
            accessToken: accessToken,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

