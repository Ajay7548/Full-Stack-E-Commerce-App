import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useShop();
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-3xl md:text-4xl text-center">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto dark:text-white text-gray-600 text-center text-xs sm:text-sm md:text-base py-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae,
          culpa.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSeller.map((item) => (
          <ProductItems
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
