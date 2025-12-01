import React from "react";
import Title from "./Title";
import { useEffect } from "react";

const CartTotal = ({subtotal=0, currency,navigate, showButton= true }) => {
  const shippingFee = 50; // Example flat shipping fee
  useEffect(()=>{
    console.log("Subtotal Passed to CartTotal:", subtotal);
  },[subtotal])

  return (
    <div className="mt-10   mx-auto dark:bg-gray-900 bg-gray-100 p-6 rounded-md shadow-md">
      <div className="text-2xl text-center my-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between px-2 py-2 border-b dark:text-white border-gray-400">
          <p className="text-sm">SubTotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between px-2 py-2 border-b dark:text-white border-gray-400">
          <p className="text-sm">Shipping Fee</p>
          <p>
            {currency} {subtotal > 0 ? shippingFee.toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="flex justify-between px-2 py-2 border-b dark:text-white border-gray-400">
          <p className="text-sm font-semibold">Total</p>
          <p>
            {currency} {(subtotal > 0 ? subtotal + shippingFee : 0).toFixed(2)}
          </p>
        </div>
       
        </div>
        {showButton && (
          <div className="flex justify-end">
          <button 
            onClick={() => navigate && navigate('/PlaceOrder')}
            className="bg-black px-8 py-2  text-sm mt-4 text-white rounded-md cursor-pointer hover:bg-gray-800">Proceed To Checkout</button>
        
          </div>
        )}
    </div>
  );
};

export default CartTotal;
