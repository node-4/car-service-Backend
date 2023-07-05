const Service = require("../models/subscriptionPlan");
const { createResponse } = require("../utils/response/response");
// Create a new service
exports.createService = async (req, res) => {
    try {
        const { name, description, serviceId, price } = req.body;
        const service = new Service({
            name,
            serviceId,
            description,
            price,
        });
        await service.save();
        return createResponse(
            res,
            201,
            "Service created successfully",
            service
        );
    } catch (err) {
        console.error(err.message);
        return createResponse(res, 500, "Server Error");
    }
};

// Get all services

exports.getServices = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.serviceId) {
            queryObj.serviceId = req.query.serviceId;
        }
        if (req.query.name) {
            queryObj.name = RegExp(req.query.name, "i");
        }
        const service = await Service.find(queryObj);
        if (!service || !service.length) {
            return createResponse(res, 404, "Service not found");
        }
        return createResponse(
            res,
            200,
            "Service retrieved successfully",
            service
        );
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return createResponse(res, 404, "Service not found");
        }
        return createResponse(res, 500, "Server Error");
    }
};
// Get a service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return createResponse(res, 404, "Service not found");
        }
        return createResponse(
            res,
            200,
            "Service retrieved successfully",
            service
        );
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return createResponse(res, 404, "Service not found");
        }
        return createResponse(res, 500, "Server Error");
    }
};

// Update a service by ID
exports.updateServiceById = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let service = await Service.findById(req.params.id);
        if (!service) {
            return createResponse(res, 404, "Service not found");
        }
        service.name = name || service.name;
        service.description = description || service.description;
        service.price = price || service.price;
        await service.save();
        return createResponse(
            res,
            200,
            "Service updated successfully",
            service
        );
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return createResponse(res, 404, "Service not found");
        }
        return createResponse(res, 500, "Server Error");
    }
};

// Delete a service by ID
exports.deleteServiceById = async (req, res) => {
    try {
        let service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return createResponse(res, 404, "Service not found");
        }

        return createResponse(res, 200, "Service deleted successfully");
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return createResponse(res, 404, "Service not found");
        }
        return createResponse(res, 500, "Server Error");
    }
};
