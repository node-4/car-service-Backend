const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    getPriceWithDiscount,
} = require("../controllers/car-service.controller");

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
  params: {
    folder: "images/services",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "PNG",
      "xlsx",
      "xls",
      "pdf",
      "PDF",
      "avif",
    ],
  },
});
const upload = multer({ storage: storage });
const { authJwt, objectId } = require("../middlewares");

// Create a new service
router.post("/car-services", upload.single("images"), createService);

// Get all services
router.get("/car-services", getAllServices);

// Get a single service by ID
router.get("/car-services/:id", getServiceById);

// Update a service by ID
router.put("/car-services/:id", updateServiceById);

// Delete a service by ID
router.delete("/car-services/:id", deleteServiceById);
router.post("/car-services-discount", getPriceWithDiscount);
module.exports = router;
