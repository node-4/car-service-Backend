const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");
const { StatusCodes } = require("http-status-codes");
const { secret } = require("../configs/auth.config");

require("dotenv").config();

const verifyToken = (req, res, next) => {
    let token =
        req.headers["x-access-token"] ||
        req.get("Authorization")?.split("Bearer ")[1];
    console.log(token);
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            message: "Unauthorized ! No token provided!",
        });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            console.log(err);
            if (err.name === "TokenExpiredError") {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    success: false,
                    message: "Token expired!",
                });
            }
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: "Unauthorized!",
            });
        }
        const user = await User.findById(decoded.id);
        console.log(user);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                message: "User not found for this token",
            });
        }
        req.user = user;
        console.log(req.user._id);
        next();
    });
};

const isAdmin = (req, res, next) => {
    let token =
        req.headers["x-access-token"] ||
        req.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            message: "Unauthorized ! No token provided!",
        });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            console.log(err);
            if (err.name === "TokenExpiredError") {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    success: false,
                    message: "Token expired!",
                });
            }
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: "Unauthorized!",
            });
        }
        const user = await Admin.findById(decoded.id);
        // console.log(user);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                message: "User not found for this token",
            });
        }
        req.user = user;
        next();
    });
};

module.exports = { verifyToken, isAdmin };
