import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-[4%] sm:px-[3vw]  bg-gray-50 font-medium shadow-md">

      <div className="flex items-center gap-1">
        {/* <img
          src={darkMode ? blaclogo : whiteLogo} // Correctly switching logos
          alt="logo"
          className="h-10 pt-1" // Keeping className only for styling

        /> */}
        <div className='flex flex-col '>
          <p
          className="lg:text-2xl text-xl   text-gray-700 dark:text-gray-900 pt-2 font-semibold logo"
       
        >
          TRENDHIVE.
        </p>
        <span className='text-yellow-400 text-sm '>ADMIN PANEL</span>
        </div>
      </div>

      <button onClick={()=>setToken('')} className='px-6 py-2 bg-yellow-500 font-semibold  rounded-md hover:rounded-full'>Logout</button>
      </nav>
    </div>
  )
}

export default Navbar