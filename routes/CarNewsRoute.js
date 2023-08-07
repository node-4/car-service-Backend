const express = require("express");
const router = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  getCarById,

} = require("../services/car-services");
const { getCarNews, createCarNews, updateCarNews, deleteCarNews } = require("../controllers/CarNewsCtrl");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/CarNews",
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

router.get("/carnews", getCarById);
router.get("/carnews/:id", getCarNews);
router.post("/carnews", upload.single("image"), createCarNews);
router.put("/carnews/:id", updateCarNews);
router.delete("/carnews/:id", deleteCarNews);

module.exports = router;
