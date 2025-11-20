import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
const addProduct = async(req,res)=>{

    // console.log("BODY RAW:", req.body);
    // console.log("FILES RAW:", req.files);

    try {
        const {name,description,price,category,subCategory,size,bestseller} = req.body

        // Extract images
        const images = [
            req.files.image1?.[0],
            req.files.image2?.[0],
            req.files.image3?.[0],
            req.files.image4?.[0]
        ].filter(Boolean);

        // Upload to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async(item)=>{
                const result = await cloudinary.uploader.upload(item.path);
                return result.secure_url;
            })
        );

        // SAFE SIZE PARSING
        const finalSize = size ? size.split(",") : [];

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            size: finalSize,
            image: imagesUrl,
            date: Date.now(),
            bestseller: bestseller === "true"
        };

        console.log("PRODUCT DATA:", productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });

    } catch (error) {
        console.error("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

const listProduct = async(req,res)=>{
    try {
        const products = await productModel.find({})
        res.json({success:true,products})

    } catch (error) {
        console.error("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}
const removeProduct = async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message:'Product Removed'});
    } catch (error) {
        console.error("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}
const singleProduct = async(req,res)=>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true,product});
    } catch (error) {
        console.error("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export {addProduct,listProduct,removeProduct,singleProduct}