const Banner = require("../models/banner");
const { createResponse } = require("../utils/response/response");
exports.createBanner = async (req, res) => {
    try {
        const banner = new Banner(req.body);
        await banner.save();
        createResponse(res, 201, "Banner created successfully", banner);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        if (!banners.length) {
            return createResponse(res, 404, "No banners found");
        }
        createResponse(res, 200, "Banners retrieved successfully", banners);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            createResponse(res, 404, "Banner not found");
            return;
        }
        createResponse(res, 200, "Banner retrieved successfully", banner);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!banner) {
            createResponse(res, 404, "Banner not found");
            return;
        }
        createResponse(res, 200, "Banner updated successfully", banner);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) {
            createResponse(res, 404, "Banner not found");
            return;
        }
        createResponse(res, 200, "Banner deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
