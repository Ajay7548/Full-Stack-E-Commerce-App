import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import whiteLogo from "../assets/whiteLogo.png";
import blaclogo from "../assets/blaclogo.png";
import { useDarkMode } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className=" text-white pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Content - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          
          {/* Logo & About Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 pb-4">
              <img src={darkMode ? blaclogo : whiteLogo} alt="TrendHive Logo" className="h-12" />
              <p className="text-2xl text-black dark:text-white font-bold">TRENDHIVE</p>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your one-stop destination for the latest fashion trends. Quality, style, and convenience at your fingertips.
            </p>
            <p className="text-gray-400 mt-4">📧 mouryaajay7548@gmail.com</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="dark:hover:text-white hover:text-black  transition">Home</Link></li>
              <li><Link to="/shop" className="dark:hover:text-white hover:text-black  transition">Shop</Link></li>
              <li><Link to="/about" className="hdark:over:text-white  hover:text-black transition">About</Link></li>
              <li><Link to="/contact" className="dark:hover:text-white hover:text-black  transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Follow Us</h3>
            <div className="flex gap-4 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-red-500 transition text-2xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition text-2xl">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/in/ajay-mourya-22b643150/" className="text-gray-400 hover:text-red-500 transition text-2xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Centered */}
        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Ajay Mourya - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;