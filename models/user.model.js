const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        carModel: {
            type: String,
            //     required: true,
        },
        carNumber: {
            type: String,
            //     required: true,
        },
        fuel: {
            type: String,
            //     required: true,
        },
        otp: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

userSchema.pre("save", function (next) {
    if (!this.fullName || !this.mobile) {
        const err = new Error("All fields are required.");
        return next(err);
    }
    next();
});
