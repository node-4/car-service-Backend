const express = require("express");
const router = express.Router();
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { createTrackOrder, getTrackOrder, getAllTrackOrder, updateTrackOrder, deleteTrackOrder } = require("../controllers/TracKOrderCtrl");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/trackO",
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

router.post("/track/order",upload.single("image"),createTrackOrder);
router.get("/track/order/:id", getTrackOrder);
router.get("/track/order", getAllTrackOrder);
router.put("/track/order/:id", updateTrackOrder);
router.delete("/track/order/:id", deleteTrackOrder);

module.exports = router;