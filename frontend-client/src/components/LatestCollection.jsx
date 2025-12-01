import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import Title from "./Title";
import { products } from "../assets/frontend_assets/assets";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useShop();

  const [latestProducts, setlatestProducts] = useState([]);

  // console.log(products._image)

  useEffect(() => {
    setlatestProducts(products.slice(0, 10));
    // console.log(ProductItems.products)
  }, [products]);
  // console.log(products)
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        {/* this text can be use anywhere providig text value  */}
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4  m-auto text-xs sm:text-sm md:text-base dark:text-white text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
          modi.
        </p>
      </div>

      {/* Rendering PRodycts  */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {latestProducts.map((item, index) => (
          <ProductItems
            key={index}
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

export default LatestCollection;
