import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <>
      <div className='w-[18%] min-h-screen px-4  border-r-2 border-gray-300'>
        <div className=' flex flex-col gap-4 pt-6  text-[15px]'>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg border border-gray-300 shadow-md transition-all duration-300 ease-in hover:scale-105
               ${isActive ? "bg-yellow-500 text-white" : "bg-white text-gray-700"}`
            }
          >
            <img src={assets.order_icon} className="w-5 h-5" />
            <p className="hidden md:block">Add Items</p>
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg border border-gray-300 shadow-md transition-all duration-300 ease-in hover:scale-105
               ${isActive ? "bg-yellow-500 text-white" : "bg-white text-gray-700"}`
            }
          >
            <img src={assets.order_icon} className="w-5 h-5" />
            <p className="hidden md:block">List Items</p>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg border border-gray-300 shadow-md transition-all duration-300 ease-in hover:scale-105
               ${isActive ? "bg-yellow-500 text-white" : "bg-white text-gray-700"}`
            }
          >
            <img src={assets.order_icon} className="w-5 h-5" />
            <p className="hidden md:block">Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar