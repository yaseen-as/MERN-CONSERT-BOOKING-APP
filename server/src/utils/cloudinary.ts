import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded on cloudinary . file src:", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("error on cloudinary:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (publicId: string) => {
  try {
    if (!publicId) return null;
    await cloudinary.uploader.destroy(publicId);
    console.log("file deleted on cloudinary . file src:", publicId);
  } catch (error) {
    console.log("error on cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
