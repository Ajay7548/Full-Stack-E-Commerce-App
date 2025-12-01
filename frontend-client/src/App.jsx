import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Login from './pages/Login'
import Product from './pages/Product'
import Verify from './pages/Verify'
import Wishlist from './pages/Wishlist'
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBox from './components/SearchBox'
import { ToastContainer, toast } from 'react-toastify'
import { ThemeProvider } from './context/ThemeContext'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };


  return (
    <>
      <ThemeProvider>
        
          <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-slate-950">
      <ToastContainer />
          {/* <SearchBox/> */}

          <hr className="w-full dark:border-gray-800 border-gray-200 " />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Add this line */}
            <Route path="/Home" element={<Home />} />
            <Route path="/Collections" element={<Collection />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Product/:productId" element={<Product />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/PlaceOrder" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>


          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
