const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const validateEmail = (email) => {
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
const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
AdminSchema.pre("save", function (next) {
    if (!this.email || !this.password) {
        const err = new Error("Email and Password are required.");
        return next(err);
    }
    if (!validateEmail(this.email)) {
        return next(new Error("Invalid email"));
    }
    if (!isValidPassword(this.password)) {
        if (this.password.length < 8) {
            return next(new Error("Password must be atleast 8 characters."));
        }
        if (this.password.length > 25) {
            return next(new Error("Password must be less than 25 characters."));
        }
        return next(
            new Error(
                "Invalid password ! their must be atleast one capital,numbers and symbols."
            )
        );
    }
    next();
});

module.exports = mongoose.model("Admin", AdminSchema);
// Assumption: Admin schema model has a "email" field

// // Define the pre-save middleware function
// AdminSchema.pre("save", async function (next) {
//     try {
//         // Check if email is present and valid

//         next();
//     } catch (err) {
//         next(err);
//     }
// });
