import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const ProductItems = ({ id, name, image, price }) => {
  const { currency, addToWishlist, wishlistItems } = useShop();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const isWishlisted = wishlistItems[id];

  return (
    <div className='group relative'>
      <Link 
      to={`/Product/${id}`} 
      className="text-gray-800 dark:text-gray-300 cursor-pointer block"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
        {/* Image Section */}
        <div
            className="w-full aspect-[3/4] hover:scale-105 transition-transform duration-300"
        >
            <img
            className="w-full h-full object-cover object-center transition-transform duration-500"
            src={image[0]}
            alt={name}
            loading="lazy"
            />
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {name}
        </h3>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {currency}{price}
        </p>
      </div>
    </Link>

    {/* Wishlist Button */}
    <button
        onClick={(e) => {
            e.preventDefault();
            addToWishlist(id);
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-black transition-colors active:scale-90 z-10"
    >
        <FaHeart 
            className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} 
        />
    </button>
    </div>
  );
};

export default ProductItems;
