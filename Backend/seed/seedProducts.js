import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

import productModel from "../models/productModel.js";
import { seedProducts } from "./assetsSeeder.js";

// For absolute paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connect
await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected");

const seed = async () => {
  try {
    await productModel.deleteMany({});
    console.log("Old products removed");

    for (const product of seedProducts) {
      const uploadedImages = [];

      for (const img of product.image) {
        const absolutePath = path.join(__dirname, img);   // << FIX
        const uploaded = await cloudinary.uploader.upload(absolutePath);
        uploadedImages.push(uploaded.secure_url);
      }

     await productModel.create({
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category,
  subCategory: product.subCategory,
  bestseller: product.bestseller,
  sizes: product.sizes,     // <-- IMPORTANT
  image: uploadedImages,
  date: Date.now()
});


      console.log("Inserted:", product.name);
    }

    console.log("ALL DONE! ✔");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
