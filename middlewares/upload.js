const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "movie-gallery"
    }
});

const musicStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["wav", "webm"],
        folder: "audio",
        resource_type: "raw",
        use_filename: true
    }
});

module.exports = { imageUploadMiddleware: multer({ storage }), audioUploadMiddleware: multer({ musicStorage }) };