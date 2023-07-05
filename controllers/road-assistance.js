const Service = require("../models/road-assistance");
const { createResponse } = require("../utils/response/response");

// GET all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if (services.length === 0) {
            return createResponse(res, 404, "No services found");
        }
        createResponse(res, 200, "Services retrieved successfully", services);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

// GET a service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            createResponse(res, 200, "Service retrieved successfully", service);
        } else {
            createResponse(res, 404, "Service not found");
        }
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

// CREATE a new service
exports.createService = async (req, res) => {
    const service = new Service({
        userId: req.user._id,
        description: req.body.description,
    });

    try {
        const newService = await service.save();
        createResponse(res, 201, "Service created successfully", newService);
    } catch (error) {
        console.log(error);
        createResponse(res, 400, error.message);
    }
};
