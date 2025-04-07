const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "cms-periodico",
        allowedFormats: ["jpg", "png", "jpeg", "svg", "gif"]
    }
});

const upload = multer({ storage: storage });

module.exports = upload;