const express = require("express");
const router = express.Router();
const carSparePartController = require("../controllers/spare-parts.controller");

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
    folder: "images/spare-parts",
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

router.post(
  "/spare-parts",
  upload.single("image"),
  carSparePartController.createCarSparePart
);
router.get("/spare-parts", carSparePartController.getCarSpareParts);
router.get("/spare-parts/:id", carSparePartController.getCarSparePart);
router.put("/spare-parts/:id", carSparePartController.updateCarSparePart);
router.delete("/spare-parts/:id", carSparePartController.deleteCarSparePart);

module.exports = router;
