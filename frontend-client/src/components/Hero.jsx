import React from "react";
import hero_Img from "../assets/hero_img.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[85vh] md:h-[90vh] overflow-hidden bg-gray-50 dark:bg-neutral-900 flex items-center justify-center pt-20 pb-8 md:pt-24 md:pb-0">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col md:flex-row items-center justify-between relative z-10 h-full gap-8 md:gap-4">
        {/* Left Side - Content */}
        <div 
          className="w-full md:w-1/2 flex flex-col items-start justify-center gap-4 md:gap-6 text-left animate-fade-in-up"
        >
          {/* <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-gray-800 dark:bg-gray-200"></span>
            <p className="font-medium text-sm md:text-base tracking-[0.2em] text-gray-600 dark:text-gray-300 uppercase">
              New Collection 2025
            </p>
          </div> */}

          <h1 className="prata-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-gray-900 dark:text-white">
            Elevate Your <br />
            <span className="italic font-light text-gray-500 dark:text-gray-400">Style</span> Game
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
            Discover the latest trends in fashion with our curated collection of premium clothing and accessories.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2 md:mt-4 w-full sm:w-auto">
            <Link to="/collections" className="w-full sm:w-auto">
                <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105 shadow-lg"
                >
                Shop Now
                </button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
                <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 dark:border-gray-700 text-black dark:text-white text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all hover:scale-105"
                >
                Explore
                </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div 
          className="w-full md:w-1/2 h-[40vh] sm:h-[45vh] md:h-full flex items-center justify-center relative animate-fade-in mt-4 md:mt-0"
        >
            <div className="relative w-full h-full flex items-center justify-center px-4 md:px-0">
                 {/* Abstract Shapes behind image */}
                 <div className="absolute w-[70%] sm:w-[75%] md:w-[80%] h-[70%] sm:h-[75%] md:h-[80%] border border-gray-200 dark:border-gray-800 rounded-full animate-spin-slow opacity-50" style={{ animationDuration: '20s' }}></div>
                 <img 
                    src={hero_Img} 
                    alt="Hero Fashion" 
                    className="max-h-[85%] max-w-[85%] md:max-h-[90%] md:max-w-full object-contain drop-shadow-2xl z-10 relative"
                 />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
