const Accessories = require("../models/acessories");
const { createResponse } = require("../utils/response/response");

// GET all accessories
const getAllAccessories = async (req, res) => {
    try {
        let query = {};
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }
        if (req.query.price) {
            query.price = { $regex: req.query.price, $options: "i" };
        }
        const accessories = await Accessories.find(query).lean();
        if (accessories.length === 0) {
            return createResponse(res, 404, "No accessories found.");
        }
        createResponse(
            res,
            200,
            "Accessories retrieved successfully",
            accessories
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving accessories", error.message);
    }
};
const deleteAccessory = async (req, res) => {
    try {
        const accessory = await Accessories.findByIdAndDelete(req.params.id);
        if (!accessory) {
            return createResponse(res, 404, "Accessory not found.");
        }
        createResponse(res, 200, "Accessory deleted successfully", accessory);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving accessory.", error.message);
    }
};

// GET an accessory by ID
const getAccessoryById = async (req, res) => {
    try {
        const accessory = await Accessories.findById(req.params.id).lean();
        if (!accessory) {
            return createResponse(res, 404, "Accessory not found");
        }
        createResponse(res, 200, "Accessory retrieved successfully", accessory);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving accessory", error.message);
    }
};
const updateAccessory = async (req, res) => {
    try {
        const accessory = await Accessories.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!accessory) {
            return createResponse(res, 404, "Accessory not found");
        }
        createResponse(res, 200, "Accessory updated successfully", accessory);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving accessory ", error.message);
    }
};

// CREATE a new accessory
const createAccessory = async (req, res) => {
    try {
        const { name, price, description} = req.body;
        const images = req.file.path;
        const accessory = new Accessories({ name, price, description, images });
        const newAccessory = await accessory.save();
        createResponse(
            res,
            201,
            "Accessory created successfully.",
            newAccessory
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error creating accessory.", error.message);
    }
};

module.exports = {
    getAllAccessories,
    getAccessoryById,
    createAccessory,
    deleteAccessory,
    updateAccessory,
};
