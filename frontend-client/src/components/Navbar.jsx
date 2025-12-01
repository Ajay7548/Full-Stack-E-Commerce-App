import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import whiteLogo from "../assets/whiteLogo.png";
import blaclogo from "../assets/blaclogo.png";
import dropdown_icon from "../assets/dropdown_icon.png";
import { useDarkMode } from "../context/ThemeContext";
import { FaMoon, FaSearch, FaSun, FaShoppingCart, FaUser, FaBars, FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setShowSearch, getCartCount, setToken, navigate, setCartItems, token } = useShop();
  const { darkMode, setDarkMode } = useDarkMode();
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between py-3 px-3 sm:px-[3vw] md:px-[4vw] lg:px-[9vw] transition-all duration-300 ${
        scrolled ? "glass shadow-sm py-2 sm:py-3" : "bg-transparent py-4 sm:py-5"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1 sm:gap-2 group">
        <img
          src={darkMode ? blaclogo : whiteLogo}
          alt="logo"
          className="h-5 sm:h-8 md:h-9 group-hover:scale-105 transition-transform duration-300"
        />
        <p
          className="text-sm sm:text-xl md:text-2xl tracking-wider text-gray-800 dark:text-gray-100 font-bold logo"
        >
          TRENDHIVE.
        </p>
      </Link>

      {/* Nav Links */}
      <ul className="hidden sm:flex gap-8 text-sm font-medium tracking-wide">
        {["HOME", "COLLECTIONS", "ABOUT", "CONTACT"].map((item, index) => (
          <NavLink
            key={index}
            to={`/${item === "HOME" ? "" : item}`}
            className="relative group text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <p>{item}</p>
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {/* Search Icon */}
        <div
          onClick={() => setShowSearch(true)}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" />
        </div>

        {/* Wishlist Icon */}
        <Link to="/wishlist" className="hidden sm:block">
            <div className="hover:scale-110 transition-transform">
                <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" />
            </div>
        </Link>

        {/* Dark Mode Toggle */}
        <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
          {darkMode ? (
            <FaSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 hover:rotate-90 transition-transform duration-500" />
          ) : (
            <FaMoon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 hover:-rotate-12 transition-transform duration-500" />
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => (token ? setProfileOpen(!profileOpen) : navigate('/login'))}
          >
            <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" />
          </div>

          {/* Dropdown */}
          {token && profileOpen && (
            <div
              className="absolute right-0 mt-4 w-48 bg-white dark:bg-neutral-900 shadow-xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 z-50 animate-fade-in"
            >
              <ul className="text-sm text-gray-700 dark:text-gray-300">
                <li onClick={() => navigate('/Home')} className="px-5 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                  <Link onClick={() => setProfileOpen(false)}>My Profile</Link>
                </li>
                <li onClick={() => navigate('/Order')} className="px-5 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                  <Link onClick={() => setProfileOpen(false)}>Orders</Link>
                </li>
                <li onClick={() => navigate('/wishlist')} className="px-5 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                  <Link onClick={() => setProfileOpen(false)}>Wishlist</Link>
                </li>
                <li
                  className="px-5 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 cursor-pointer transition-colors"
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/Cart" className="relative">
          <div className="hover:scale-110 transition-transform">
            <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" />
          </div>
          {getCartCount() > 0 && (
              <span
                  className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
              >
                  {getCartCount()}
              </span>
          )}
        </Link>

        {/* Mobile Menu Icon */}
        <div
          onClick={() => setIsVisible(true)}
          className="sm:hidden cursor-pointer hover:scale-110 transition-transform"
        >
          <FaBars className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </div>
      </div>

      {/* Sidebar Menu */}
      {isVisible && (
        <>
          <div
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          <div
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-neutral-900 shadow-2xl z-50 transition-transform duration-300"
          >
              <div className="flex flex-col h-full">
              <div
                  onClick={() => setIsVisible(false)}
                  className="flex items-center gap-4 p-6 cursor-pointer border-b dark:border-gray-800"
              >
                  <img
                  src={dropdown_icon}
                  alt="close"
                  className="h-4 rotate-180 hover:scale-110 transition-transform"
                  />
                  <p className="font-medium text-gray-600 dark:text-gray-300">Back</p>
              </div>

              <div className="flex flex-col p-6 gap-2">
                  {["Home", "Collections", "About", "Contact"].map((item, index) => (
                  <NavLink
                      key={index}
                      onClick={() => setIsVisible(false)}
                      to={`/${item.toUpperCase()}`}
                      className={({ isActive }) => `py-3 px-4 rounded-lg transition-colors ${isActive ? 'bg-gray-100 dark:bg-neutral-800 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-neutral-800'}`}
                  >
                      <p className="text-gray-700 dark:text-gray-200">{item}</p>
                  </NavLink>
                  ))}
                  <Link to="/wishlist" onClick={() => setIsVisible(false)} className="py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                      <p className="text-gray-700 dark:text-gray-200">Wishlist</p>
                  </Link>
              </div>
              </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
