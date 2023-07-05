const { createResponse } = require("../utils/response/response");
const Vendor = require("../models/vendor.model");
const isValidEmail = (email) => {
    // checks valid email format
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const isValidPassword = (password) => {
    // checks password meets requirements
    return password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
    );
};

async function validateRequiredFields(req, res, next) {
    const { name, garageName, email, password, phone, address } = req.body;
    const requiredFields = [
        "name",
        "garageName",
        "email",
        "password",
        "phone",
        "address",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    // for (const field of requiredFields) {
    //     if (!req.body[field]) {
    //         return createResponse(res, 400, `${field} is required`);
    //     }
    // }
    if (missingFields.length > 1) {
        return createResponse(
            res,
            400,
            `${missingFields.join(", ")} are required`
        );
    }
    if (missingFields.length === 1) {
        return createResponse(res, 400, `${missingFields[0]} is required`);
    }
    if (!isValidEmail(email)) {
        return createResponse(res, 400, "Invalid email format");
    }
    if (!isValidPassword(password)) {
        return createResponse(
            res,
            400,
            "password must be between 8 and 25 characters, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        );
    }
    const phoneExists = await Vendor.findOne({ phone });
    if (phoneExists) {
        return createResponse(res, 400, "Phone number already in use");
    }
    next();
}

module.exports = { validateRequiredFields };
