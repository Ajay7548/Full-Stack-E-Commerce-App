
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import stripe_logo from "../assets/stripe_logo.png";
import razorpay_logo from "../assets/razorpay_logo.png";
import axios from "axios";
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const navigate = useNavigate()
  const {token, cartItems, subtotal, setCartItems, getCartAmount, delivery_fee, products } = useShop()
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

 

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {

      let orderItems = [];

for (let productId in cartItems) {
  for (let size in cartItems[productId]) {
    if (cartItems[productId][size] > 0) {

      const product = products.find((p) => p._id === productId);

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image[0],   // only first image
        size,
        quantity: cartItems[productId][size],
      });
    }
  }
}


      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,        // <-- add this
        date: Date.now()              // <-- add this
      }


      switch (method) {
        case 'cod':
          const response = await axios.post('/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/order')
          } else {
            toast.error(response.data.message)
          }
          break;

            case 'stripe':
          const responseStripe = await axios.post('/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <form onSubmit={onSubmitHandler} className="grid md:grid-cols-2 gap-6 p-6 pt-26">

      {/* Left Side - Delivery Information */}
      <div className="w-full">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        <div className="px-6 py-12 w-full max-w-[600px] mx-auto rounded-md shadow-lg dark:shadow-gray-700">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input required onChange={onchangeHandler} name="firstName" value={formData.firstName} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full" type="text" placeholder="First name" />
              <input required onChange={onchangeHandler} name="lastName" value={formData.lastName} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full" type="text" placeholder="Last name" />
            </div>

            <input required onChange={onchangeHandler} name="email" value={formData.email} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full block" type="text" placeholder="Email address" />

            <input required onChange={onchangeHandler} name="street" value={formData.street} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full block" type="text" placeholder="Street" />

            <div className="flex gap-4">
              <input required onChange={onchangeHandler} name="city" value={formData.city} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full" type="text" placeholder="City" />
              <input required onChange={onchangeHandler} name="state" value={formData.state} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full" type="text" placeholder="State" />
            </div>

            <div className="flex gap-4">
              <input required onChange={onchangeHandler} name="zipcode" value={formData.zipcode} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full" type="text" placeholder="Zipcode" />
              <input required onChange={onchangeHandler} name="country" value={formData.country} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full" type="text" placeholder="Country" />
            </div>

            <input required onChange={onchangeHandler} name="phone" value={formData.phone} className="border placeholder-gray-400 border-gray-400 px-3 py-2 w-full block" type="text" placeholder="Phone" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col">

        {/* Order Summary */}
        <div className="border dark:border-gray-700 border-gray-300 p-4 rounded-md">

          <CartTotal subtotal={subtotal} currency={"$"} showButton={false} />

        </div>

        {/* Payment Method */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex  flex-col lg:flex-row px-2 py-4 justify-between dark:shadow-gray-700 shadow-md">

            <div onClick={() => setMethod('stripe')} className="flex items-center gap-5 px-10 py-4 cursor-pointer border dark:border-gray-700 border-gray-200">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-500" : ""}`} />
              <img className="h-5" src={stripe_logo} alt="Stripe" />
            </div>

            {/* <div onClick={() => setMethod('razorpay')} className="flex items-center gap-5 px-2 py-4 cursor-pointer border dark:border-gray-700 border-gray-200">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-500" : ""}`} />
              <img className="h-5" src={razorpay_logo} alt="Razorpay" />
            </div> */}

            <div onClick={() => setMethod('cod')} className="flex items-center gap-5 px-10 py-4 cursor-pointer border dark:border-gray-700 border-gray-200">
              <p className={`min-w-3.5 h-3.5 border  rounded-full ${method === "cod" ? "bg-green-500" : ""}`} />
              <p className="text-gray-500 text-sm">CASH ON DELIVERY</p>
            </div>

          </div>


          {/* Place Order Button */}
          <div className="flex justify-end">
            <button type="submit" className="bg-gray-800 py-3 mt-6 px-16 text-sm text-white rounded-sm cursor-pointer hover:bg-gray-900">
              PLACE ORDER
            </button>
          </div>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;

