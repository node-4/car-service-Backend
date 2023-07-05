const Info = require("../models/info.model"); // Import the Info model
const { createResponse } = require("../utils/response/response"); // Import the createResponse function
// Function to handle creating a new Info document
exports.createInfo = async (req, res) => {
    try {
        const newInfo = new Info(req.body);
        await newInfo.save();
        createResponse(res, 201, "Info created successfully", newInfo);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle retrieving all Info documents
exports.getInfo = async (req, res) => {
    try {
        const info = await Info.find();
        if (!info || info.length === 0) {
            return createResponse(
                res,
                404,
                "contact us and about us not found"
            );
        }
        createResponse(res, 200, "Info retrieved successfully", info[0]);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle updating an Info document by ID
exports.updateInfo = async (req, res) => {
    try {
        const info = await Info.findOne();
        info.aboutUs.title = req.body.title || info.aboutUs.title;
        info.aboutUs.description =
            req.body.description || info.aboutUs.description;
        info.aboutUs.image = req.body.image || info.aboutUs.image;
        info.contactUs.email = req.body.email || info.contactUs.email;
        info.contactUs.message = req.body.message || info.contactUs.message;
        info.contactUs.address = req.body.address || info.contactUs.address;
        info.contactUs.phone = req.body.phone || info.contactUs.phone;
        const updatedInfo = await info.save();
        createResponse(res, 200, "Info updated successfully", updatedInfo);
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

// Function to handle deleting an Info document by ID
exports.deleteInfo = async (req, res) => {
    try {
        if (!(await Info.findByIdAndDelete(req.params.id))) {
            return createResponse(res, 404, "Info not found");
        }
        createResponse(res, 200, "Info deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
