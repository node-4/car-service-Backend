const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { accessToken, secret } = require("../configs/auth.config");
exports.signup = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !req.body.password) {
            return res
                .status(400)
                .json({ error: "Email and password are required!" });
        }

        const password = bcrypt.hashSync(req.body.password, 8);

        const admin = new Admin({ email, password });
        await admin.save();

        res.status(201).json({
            message: "signed up successfully",
            data: admin,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = bcrypt.compareSync(user.password, password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, secret, {
            expiresIn: accessToken,
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Retrieve all admins from the database.
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        if (admins.length === 0) {
            return res.status(404).json({ message: "No admins found" });
        }
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving admins.",
        });
    }
};

// Find a single admin with an id
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(500).send({
            message: "Error retrieving admin",
        });
    }
};

// Update an admin identified by the id in the request
exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            {
                email: req.body.email || undefined,
                password: req.body.password || undefined,
            },
            { new: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(500).send({ message: "Error updating admin" });
    }
};

// Delete an admin with the specified id in the request
exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndRemove(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(204).send();
    } catch (error) {
        if (error.kind === "ObjectId" || error.name === "NotFound") {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(500).send({
            message: "Could not delete admin",
        });
    }
};
