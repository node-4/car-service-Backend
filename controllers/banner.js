const Banner = require("../models/banner");
const Brand = require("../models/brand");
const Bodyfuelmodelvarient = require("../models/bodyfuelmodelvarient");
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
exports.createBrand = async (req, res) => {
    try {
        const { name, } = req.body;
        const image = req.file.path;
        const brand = new Brand({ image, name });
        const newBrand = await brand.save();
        return res.status(201).json({ message: "Brand added", data: newBrand });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.getBrands = async (req, res) => {
    try {
        const banners = await Brand.find();
        if (!banners.length) {
            createResponse(res, 404, "No brand found");
        }
        createResponse(res, 200, "Brands retrieved successfully", banners);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.getBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found", data: {} });
        }
        createResponse(res, 200, "Brand retrieved successfully", brand);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found", data: {} });
        }
        let image;
        if (req.file) {
            image = req.file.path;
        }
        let obj = {
            image: image || brand.image,
            name: req.body.name || brand.name
        }
        const updateBanner = await Brand.findByIdAndUpdate(brand._id, obj, { new: true, });
        createResponse(res, 200, "Brand updated successfully", updateBanner);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found", data: {} });
        }
        const banner = await Brand.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Brand deleted successfully", data: {} });
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.createBodyType = async (req, res) => {
    try {
        const { bodyType } = req.body;
        const findBodyType = await Bodyfuelmodelvarient.findOne({ bodyType, type: "BODYTYPE" });
        if (findBodyType) {
            return res.status(49).json({ message: "BodyType Already exit", data: {} });
        }
        const brand = new Bodyfuelmodelvarient({ bodyType, type: "BODYTYPE" });
        const newBrand = await brand.save();
        return res.status(201).json({ message: "BodyType added", data: newBrand });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.createFuelType = async (req, res) => {
    try {
        const { fuelType } = req.body;
        const findFuelType = await Bodyfuelmodelvarient.findOne({ fuelType, type: "FUELTYPE" });
        if (findFuelType) {
            return res.status(409).json({ message: "Fuel type Already exit", data: {} });
        }
        const brand = new Bodyfuelmodelvarient({ fuelType, type: "FUELTYPE" });
        const newBrand = await brand.save();
        return res.status(201).json({ message: "Fuel type added", data: newBrand });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.createModel = async (req, res) => {
    try {
        const { model } = req.body;
        const findBodyType = await Bodyfuelmodelvarient.findOne({ model, type: "MODEL" });
        if (findBodyType) {
            return res.status(409).json({ message: "Model Already exit", data: {} });
        }
        const brand = new Bodyfuelmodelvarient({ model, type: "MODEL" });
        const newBrand = await brand.save();
        return res.status(201).json({ message: "Model added", data: newBrand });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.createVariant = async (req, res) => {
    try {
        const { variant } = req.body;
        const findBodyType = await Bodyfuelmodelvarient.findOne({ variant, type: "VARIENT" });
        if (findBodyType) {
            return res.status(409).json({ message: "Variant Already exit", data: {} });
        }
        const brand = new Bodyfuelmodelvarient({ variant, type: "VARIENT" });
        const newBrand = await brand.save();
        return res.status(201).json({ message: "Variant added", data: newBrand });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.getBodyType = async (req, res) => {
    try {
        const findBodyType = await Bodyfuelmodelvarient.find({ type: "BODYTYPE" });
        if (findBodyType.length == 0) {
            return createResponse(res, 404, "No Body Type found");
        }
        createResponse(res, 200, "Body Type retrieved successfully", findBodyType);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.getFuelType = async (req, res) => {
    try {
        const findFuelType = await Bodyfuelmodelvarient.find({ type: "FUELTYPE" });
        if (findFuelType.length == 0) {
            return createResponse(res, 404, "No Fuel type found");
        }
        createResponse(res, 200, "Fuel type retrieved successfully", findFuelType);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.getModel = async (req, res) => {
    try {
        const findModel = await Bodyfuelmodelvarient.find({ type: "MODEL" });
        if (findModel.length == 0) {
            return createResponse(res, 404, "No Model found");
        }
        createResponse(res, 200, "Model retrieved successfully", findModel);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.getVariant = async (req, res) => {
    try {
        const findVariant = await Bodyfuelmodelvarient.find({ type: "VARIENT" });
        if (findVariant.length == 0) {
            return createResponse(res, 404, "No Variant found");
        }
        createResponse(res, 200, "Variant retrieved successfully", findVariant);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.getBodyFuelModeVarient = async (req, res) => {
    try {
        const findVariant = await Bodyfuelmodelvarient.findById(req.params.id);
        if (!findVariant) {
            return res.status(404).json({ message: "Data not found", data: {} });
        }
        createResponse(res, 200, "Data retrieved successfully", findVariant);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.deleteBodyFuelModeVarient = async (req, res) => {
    try {
        const brand = await Bodyfuelmodelvarient.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Data not found", data: {} });
        }
        const banner = await Bodyfuelmodelvarient.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Deleted successfully", data: {} });
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};
exports.editBodyType = async (req, res) => {
    try {
        const { bodyType } = req.body;
        const findBodyType = await Bodyfuelmodelvarient.findOne({ _id: req.params.id, type: "BODYTYPE" });
        if (!findBodyType) {
            return res.status(404).json({ message: "BodyType not found", data: {} });
        }
        let obj = {
            bodyType: bodyType || findBodyType.bodyType
        }
        let updateBodyType = await Bodyfuelmodelvarient.findByIdAndUpdate({ _id: findBodyType._id }, obj, { new: true })
        return res.status(201).json({ message: "BodyType update", data: updateBodyType });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.editFuelType  = async (req, res) => {
    try {
        const { fuelType } = req.body;
        const findFuelType = await Bodyfuelmodelvarient.findOne({ _id: req.params.id, type: "FUELTYPE" });
        if (!findFuelType) {
            return res.status(404).json({ message: "BodyType not found", data: {} });
        }
        let obj = {
            fuelType: fuelType || findFuelType.fuelType
        }
        let updateBodyType = await Bodyfuelmodelvarient.findByIdAndUpdate({ _id: findFuelType._id }, obj, { new: true })
        return res.status(201).json({ message: "FuelType update", data: updateBodyType });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.editModel = async (req, res) => {
    try {
        const { model } = req.body;
        const findModel = await Bodyfuelmodelvarient.findOne({ _id: req.params.id, type: "MODEL" });
        if (!findModel) {
            return res.status(404).json({ message: "Model not found", data: {} });
        }
        let obj = {
            model: model || findModel.model
        }
        let updatemodel = await Bodyfuelmodelvarient.findByIdAndUpdate({ _id: findModel._id }, obj, { new: true })
        return res.status(201).json({ message: "Model update", data: updatemodel });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};
exports.editVariant = async (req, res) => {
    try {
        const { variant } = req.body;
        const findVariant = await Bodyfuelmodelvarient.findOne({ _id: req.params.id, type: "VARIENT" });
        if (!findVariant) {
            return res.status(404).json({ message: "BodyType not found", data: {} });
        }
        let obj = {
            variant: variant || findVariant.variant
        }
        let updateBodyType = await Bodyfuelmodelvarient.findByIdAndUpdate({ _id: findVariant._id }, obj, { new: true })
        return res.status(201).json({ message: "BodyType update", data: updateBodyType });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};