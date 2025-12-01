import React from "react";

const Subscribe = () => {
  return (
   <div className="flex items-center justify-center">
     <div className="flex flex-col items-center w-full mt-16 max-w-lg text-center">
        <p className="text-3xl dark:text-white font-semibold">
          Subscribe Now & Get 20% Off
        </p>
        <p className="text-gray-500 dark:text-gray-600 mt-2">
          Get exclusive deals and updates delivered to your inbox.
        </p>
        <div className="flex items-center w-full border dark:border-gray-800 border-gray-300 rounded-full mt-6 overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 focus:outline-none dark:placeholder-gray-300 text-gray-700"
          />
          <button className="bg-black dark:bg-gray-800 text-white text-sm font-medium px-6 py-3 transition duration-300 hover:bg-gray-600">
            SUBSCRIBE
          </button>
        </div>
      </div>
   </div>
  );
};

export default Subscribe;
