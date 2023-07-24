const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner");
const multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images/brand",
        allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "avif"],
    },
});
const upload = multer({ storage: storage });
router.post("/banners", bannerController.createBanner);
router.get("/banners", bannerController.getBanners);
router.get("/banners/:id", bannerController.getBanner);
router.put("/banners/:id", bannerController.updateBanner);
router.delete("/banners/:id", bannerController.deleteBanner);
router.post("/brand", upload.single('image'), bannerController.createBrand);
router.get("/brand", bannerController.getBrands);
router.get("/brand/:id", bannerController.getBrand);
router.put("/brand/update/:id",upload.single('image'),  bannerController.updateBrand);
router.delete("/brand/:id", bannerController.deleteBrand);
router.post("/bodyType", bannerController.createBodyType);
router.post("/fuelType", bannerController.createFuelType);
router.post("/model", bannerController.createModel);
router.post("/varient", bannerController.createVariant);
router.get("/bodyType", bannerController.getBodyType);
router.get("/fuelType", bannerController.getFuelType);
router.get("/model", bannerController.getModel);
router.get("/varient", bannerController.getVariant);
router.get("/getBodyFuelModeVarient/:id", bannerController.getBodyFuelModeVarient);
router.delete("/deleteBodyFuelModeVarient/:id", bannerController.deleteBodyFuelModeVarient);
router.put("/bodyType/:id", bannerController.editBodyType);
router.put("/fuelType/:id", bannerController.editFuelType);
router.put("/model/:id", bannerController.editModel);
router.put("/varient/:id", bannerController.editVariant);

module.exports = router;
