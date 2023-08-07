const express = require("express");
const router = express.Router();
const {
  getCarNewses,
  getCarNews,
  createCarNews,
  updateCarNews,
  deleteCarNews,
} = require("../controllers/aritcle");

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
    folder: "images/Car",
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

router.get("/carnews", getCarNewses);
router.get("/carnews/:id", getCarNews);
router.post("/carnews", upload.single("image"), createCarNews);
router.put("/carnews/:id", updateCarNews);
router.delete("/carnews/:id", deleteCarNews);

module.exports = router;
