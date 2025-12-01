import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { products, wishlistItems } = useContext(ShopContext);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in wishlistItems) {
      if (wishlistItems[itemId]) {
        const product = products.find((product) => product._id === itemId);
        if (product) {
          tempData.push(product);
        }
      }
    }
    setWishlistData(tempData);
  }, [wishlistItems, products]);

  return (
    <div className='border-t pt-14 min-h-[80vh]'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'WISHLIST'} />
      </div>

      {wishlistData.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {wishlistData.map((item, index) => (
            <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
            >
                <ProductItems
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty.</p>
            <Link to="/collections">
                <button className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform">
                    Continue Shopping
                </button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
