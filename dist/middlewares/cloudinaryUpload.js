"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const ErrorTemplates_1 = require("../utils/ErrorTemplates");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (filePath) => {
    return await cloudinary_1.v2.uploader.upload(filePath, {
        folder: process.env.CLOUDINARY_FOLDER,
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (publicId) => {
    return await cloudinary_1.v2.uploader.destroy(publicId);
};
exports.deleteFromCloudinary = deleteFromCloudinary;
const cloudinaryUpload = async (req) => {
    if (!req.files) {
        throw new ErrorTemplates_1.NotFoundError("Image Not Found");
    }
    const file = req.files.image;
    console.log(file);
    // Validate file type
    const validFormats = ["image/jpeg", "image/png", "image/svg"];
    if (!validFormats.includes(file.mimetype)) {
        throw new ErrorTemplates_1.BadRequestError("Only JPEG, PNG, and SVG files are allowed.");
    }
    // Validate file size (max 1.5MB)
    if (file.size > 1.5 * 1024 * 1024) {
        throw new ErrorTemplates_1.BadRequestError(`Max file size is 1.5MB, your uploaded file size is ${(file.size /
            (1024 * 1024)).toFixed(2)}MB`);
    }
    // Upload file to Cloudinary
    const result = await (0, exports.uploadToCloudinary)(file.tempFilePath);
    console.log(result);
    return result;
    // Clean up the temporary file
    // fs.unlinkSync(file.tempFilePath);
};
exports.cloudinaryUpload = cloudinaryUpload;
