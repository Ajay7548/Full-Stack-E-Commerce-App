import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddProduct from './pages/AddProduct.jsx'
import ListProduct from './pages/ListProduct.jsx'
import Orders from './pages/Orders.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import { ToastContainer ,toast} from 'react-toastify';

export const currency = '$'
export const backendUrl = "https://full-stack-e-commerce-app-7ieq.onrender.com";

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):"")

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken} />
        :
        <>
          <Navbar setToken={setToken} />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>

                <Route path='/add' element={<AddProduct  token={token} />} />
                <Route path='/list' element={<ListProduct  token={token} />} />
                <Route path='/orders' element={<Orders  token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App