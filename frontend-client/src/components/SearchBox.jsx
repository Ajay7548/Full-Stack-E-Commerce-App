// import React, { useState } from 'react'

// const SearchBox = () => {
//     const [isSearchVisible,setIsSearchVisible] =useState(false)

//     const toggleSearch = () => {
//         setIsSearchVisible(!isSearchVisible);
//       };
//   return (
//     <div>
//         <div className={`${isSearchVisible ? "flex" : "hidden"} bg-gray-50 px-10 justify-center items-center py-6`}>
//         <div className="flex items-center md:w-1/2 gap-4">
//           <div className="m-auto border flex w-full items-center border-gray-400 rounded-3xl">
//             <input
//               type="search"
//               placeholder="Search"
//               className="text-gray-400 w-full h-10 px-5 py-1 focus:outline-none focus:ring-0 focus:border-transparent"
//             />
//             <img 
//             onClick={toggleSearch}
//               className="h-4 px-6"
//               src="/src/assets/frontend_assets/search_icon.png"
//               alt=""
//             />
//           </div>
//           <img 
//             className="h-4 cursor-pointer"
//             src="/src/assets/frontend_assets/cross_icon.png"
//             alt=""
//             onClick={() => setIsSearchVisible(false)}
//           />   
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SearchBox

import { useShop } from "../context/ShopContext";
import { useState } from "react";

const SearchBox = () => {
  const { setSearch, setShowSearch } = useShop();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearch(query);  // Update search query in context
    setShowSearch(false); // Close search box
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded-md"
      />
       <button className="bg-black dark:bg-gray-800 text-white text-sm font-medium px-6 py-3 transition duration-300 hover:bg-gray-600">
            SUBSCRIBE
          </button>
    </div>
  );
};

export default SearchBox;
