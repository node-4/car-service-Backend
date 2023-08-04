const Service = require("../models/car-service.model");
const { createResponse } = require("../utils/response/response");

// Create a new service
const createService = async (req, res) => {
    try {
        const { vendorId, name, price, services } = req.body;
        const images = req.file.path;
        const service = new Service({
            vendorId,
            images,
            name,
            price,
            services,
        });
        
        await service.save();
        createResponse(res, 201, "Service created successfully", service);
    } catch (error) {
        createResponse(res, 400, "Error creating service", error.message);
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if (!services || services.length === 0) {
            return createResponse(res, 404, "No services found");
        }
        createResponse(res, 200, "Services retrieved successfully", services);
    } catch (error) {
        createResponse(res, 400, "Error retrieving services", error.message);
    }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            createResponse(res, 404, "Service not found");
        } else {
            createResponse(res, 200, "Service retrieved successfully", service);
        }
    } catch (error) {
        createResponse(res, 400, "Error retrieving service", error.message);
    }
};
const mongoose = require("mongoose");
// Update a service by ID
const updateServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const { images, name, price, serviceId, services, image, description } =
            req.body;

        // const service = await Service.findOneAndUpdate(
        //     {
        //         _id: id,
        //         services: {
        //             $elemMatch: { _id: req.body.serviceId },
        //         },
        //     },
        //     {
        //         $set: {
        //             images: images,
        //             name: name,
        //             price: price,
        //             "services.$.image": image,
        //             "services.$.description": description,
        //         },
        //     },
        //     { new: true }
        // );
        const service = await Service.findOne({
            _id: id,
            "services._id": serviceId,
        });

        if (!service) {
            return createResponse(res, 404, "Service not found");
        }

        for (const item of services) {
            console.log(item);
            console.log(service.services);
            if (
                service.services.includes(new mongoose.Types.ObjectId(item._id))
            ) {
                console.log(item, "\n------------------");
                service.services.image = item.image;
                service.services.description = item.description;
            }
        }
        await service.save();

        createResponse(res, 200, "Service updated successfully", service);
    } catch (error) {
        createResponse(res, 400, "Error updating service", error.message);
    }
};

// Delete a service by ID
const deleteServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            createResponse(res, 404, "Service not found");
        } else {
            createResponse(res, 200, "Service deleted successfully", service);
        }
    } catch (error) {
        createResponse(res, 400, "Error deleting service", error.message);
    }
};

const DiscountCoupon = require("../models/discountCoupon");

const getPriceWithDiscount = async (req, res) => {
    try {
        const service = await Service.findById(req.body.serviceId);
        if (!service) {
            createResponse(res, 404, "Service not found");
            return;
        }

        let discountedPrice = service.price;
        if (req.body.code) {
            const discountCoupon = await DiscountCoupon.findOne({
                code: req.body.code,
            });
            // console.log(discountCoupon);
            if (discountCoupon) {
                discountedPrice =
                    service.price -
                    (service.price * discountCoupon.discountPercentage) / 100;
            }
        }
        // console.log(discountedPrice);

        createResponse(res, 200, "Price retrieved successfully", {
            price: parseInt(service.price),
            discountedPrice,
        });
    } catch (error) {
        createResponse(res, 500, error.message);
    }
};

module.exports = {
    getPriceWithDiscount,
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
};
