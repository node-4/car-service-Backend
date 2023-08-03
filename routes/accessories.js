const express = require("express");
const router = express.Router();
const accessoriesController = require("../controllers/accessories");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "images/Accessories", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "avif",] }
});
const upload = multer({ storage: storage });

// CREATE a new accessory
router.post("/accessories", upload.single("images"), accessoriesController.createAccessory);

// GET all accessories
router.get("/accessories",  accessoriesController.getAllAccessories);

// GET an accessory by ID
router.get("/accessories/:id", accessoriesController.getAccessoryById);
router.put("/accessories/:id", accessoriesController.updateAccessory);
router.delete("/accessories/:id", accessoriesController.deleteAccessory);

module.exports = router;
