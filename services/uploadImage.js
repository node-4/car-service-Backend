// const AWS = require("aws-sdk");
const multer = require("multer");
// const multerS3 = require("multer-s3");

// const s3Config = new AWS.S3({
//     accessKeyId: "AKIASRY3AQTBAV37WSW7",
//     secretAccessKey: "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",
//     Bucket: "flyweisimages",
// });
// const multerS3Config = multerS3({
//     s3: s3Config,
//     bucket: "flyweisimages",
//     ACL: "public-read",
//     ContentType: ["image/jpeg", "image/jpg", "image/png"],

//     metadata: function (req, file, cb) {
//         console.log("Image Uploaded ");
//         console.log(file.originalname);
//         console.log(req.file);
//         cb(null, { fieldName: file.originalname });
//     },

//     key: function (req, file, cb) {
//         console.log(file);
//         cb(null, new Date().toISOString() + "-" + file.originalname);
//     },
// });

const upload = multer({
//     storage: multerS3Config,
//     //     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
//     },
});

module.exports = upload;
