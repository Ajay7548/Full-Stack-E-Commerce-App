import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import CartTotal from "../components/CartTotal"; // Import the new component

const Cart = () => {
  const { products, currency, cartItems, updateQuantity,navigate } = useShop();
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let tempData = [];
    let total = 0;

    for (let items in cartItems) {
      for (let size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          const product = products.find((p) => p._id === items);
          if (product) {
            let itemSubtotal = product.price * cartItems[items][size];
            total += itemSubtotal;

            tempData.push({
              _id: items,
              size,
              quantity: cartItems[items][size],
              price: product.price,
            });
          }
        }
      }
    }

    setCartData(tempData);
    setSubtotal(total);
  }, [cartItems, products]);

  return (
    <div className="pt-20 flex flex-col lg:flex-row justify-between items-center gap-8">
      {/* Left: Cart Items */}
      <div className="w-full  ">
        <div className="text-2xl my-4">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="text-gray-700 dark:text-gray-300 my-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
              >
                <div className="flex gap-2 lg:gap-6 items-center">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="font-medium  lg:text-lg">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="cursor-pointer text-center w-10 sm:py-1 border dark:bg-gray-800 bg-gray-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-6 items-center">
                  <input
                    onChange={(e) => {
                      let newQuantity = Number(e.target.value);
                      if (newQuantity > 0) {
                        updateQuantity(item._id, item.size, newQuantity);
                      }
                    }}
                    className="border w-10 sm:w-16 px-1 sm:px-3 text-center"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="h-6 cursor-pointer"
                    src="/src/assets/bin_icon.png"
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Cart Totals (Using the new component) */}
          <div className="w-full">
          <CartTotal subtotal={subtotal} currency={currency} navigate={navigate} />
          </div>
    </div>
  );
};

export default Cart;
