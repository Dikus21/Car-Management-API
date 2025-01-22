import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { BadRequestError, NotFoundError } from "../utils/ErrorTemplates";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath: any) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: process.env.CLOUDINARY_FOLDER,
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};

export const cloudinaryUpload = async (req: any) => {
  if (!req.files) {
    throw new NotFoundError("Image Not Found");
  }

  const file = req.files.image;
  console.log(file);

  // Validate file type
  const validFormats = ["image/jpeg", "image/png", "image/svg"];
  if (!validFormats.includes(file.mimetype)) {
    throw new BadRequestError("Only JPEG, PNG, and SVG files are allowed.");
  }

  // Validate file size (max 1.5MB)
  if (file.size > 1.5 * 1024 * 1024) {
    throw new BadRequestError(
      `Max file size is 1.5MB, your uploaded file size is ${(
        file.size /
        (1024 * 1024)
      ).toFixed(2)}MB`
    );
  }

  // Upload file to Cloudinary
  const result = await uploadToCloudinary(file.tempFilePath);
  console.log(result);
  return result;

  // Clean up the temporary file
  // fs.unlinkSync(file.tempFilePath);
};
