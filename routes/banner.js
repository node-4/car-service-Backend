const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner");

router.post("/banners", bannerController.createBanner);
router.get("/banners", bannerController.getBanners);
router.get("/banners/:id", bannerController.getBanner);
router.put("/banners/:id", bannerController.updateBanner);
router.delete("/banners/:id", bannerController.deleteBanner);

module.exports = router;
