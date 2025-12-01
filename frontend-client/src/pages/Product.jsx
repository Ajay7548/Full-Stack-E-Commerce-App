
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { currency } from "../context";
import RelatedProduct from "../components/RelatedProduct";
import { motion } from "framer-motion";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useShop();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set default image
    }
    setLoading(false);
  }, [productId, products]);
console.log("Product Data:", productData);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return productData ? (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 pt-24"
    >
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Image Section */}
        <motion.div
          className="flex-1 flex flex-col gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Larger Main Image */}
          <motion.img
            src={image}
            alt={productData.name}
            className="w-3/4 sm:w-[400px] h-auto rounded-lg shadow-lg transition-all hover:scale-105 duration-300"
            key={image}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Small Image Thumbnails Below */}
          <div className="flex gap-2 mt-4">
  {productData?.image?.map((item, index) => (
    <motion.img
      key={index}
      src={item}
      className={`w-20 h-20 object-cover cursor-pointer rounded-md transition-all ${
        item === image
          ? "border-2 border-blue-500 ring-2 ring-blue-500 shadow-md"
          : "border border-gray-300 hover:border-gray-400"
      }`}
      onClick={() => setImage(item)}
      whileHover={{ scale: 1.1 }}
    />
  ))}
</div>

        </motion.div>

        {/* Product Details */}
        <motion.div
          className="flex-1 space-y-4 bg-white dark:bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="lg:text-4xl text-2xl font-bold dark:text-white text-gray-800">{productData.name}</h1>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="lg:w-5 w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="lg:w-5 w-4 opacity-50" />
            <p className="text-sm pl-2 dark:text-gray-200 text-gray-500">(122 reviews)</p>
          </div>
          <p className="lg:text-3xl text-2xl font-extrabold text-blue-600">{currency}{productData.price}</p>
          <p className="text-gray-600 dark:text-gray-200 lg:text-lg leading-relaxed">{productData.description}</p>

          <div className="mt-5">
            <p className="text-lg font-medium">Select Size:</p>
            <div className="flex gap-2 mt-2">
              {productData?.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-5  py-2 lg:text-lg text-sm font-medium rounded-lg transition-all ${
                    item === size
                      ? "border-blue-500 bg-blue-100 text-blue-700 shadow-md"
                      : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => addToCart(productData._id, size)}
            className="lg:w-1/2 w-full px-8 py-3 hover:bg-gray-800 cursor-pointer lg:text-lg  text-sm font-semibold text-white bg-black transition-all rounded-lg shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            ADD TO CART
          </motion.button>

          <div className="text-gray-600 dark:text-gray-200 text-sm mt-4 space-y-2">
            <hr className="my-4 border-gray-300" />
            <p>✅ 100% Original product</p>
            <p>🚚 Cash on delivery available</p>
            <p>🔄 7-day easy return & exchange</p>
          </div>
        </motion.div>
      </div>

      {/* Description & Review Section */}
      <motion.div
        className="mt-10  pt-6 dark:bg-gray-900 dark:shadow-gray-800  sadow-md bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex space-x-4 text-lg font-semibold">
          <p className="border-b-4 border-blue-500 pb-2 text-blue-600 cursor-pointer">
            Description
          </p>
          <p className="text-gray-600 cursor-pointer dark:text-gray-200 hover:text-gray-800 transition">
            Review (122)
          </p>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          E-commerce websites facilitate online buying and selling, offering convenience, accessibility, and a global marketplace.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          These platforms showcase products with detailed descriptions, images, prices, and customer reviews, enhancing user experience.
        </p>
      </motion.div>

      {/* Related Products */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </motion.div>
    </motion.div>
  ) : (
        <div className="opacity-0"></div>
  );
};

export default Product;

