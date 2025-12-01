import React, { useContext, useEffect, useState } from 'react'
import { ShopContext, useShop } from '../context/ShopContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate =useNavigate()
  const [isSignUp, setSignUp] = useState(false)
  const { token, setToken} = useShop()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const toggleForm = () => {
    setSignUp(!isSignUp)
    setName("")
    setEmail("")
    setPassword("")
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        // SIGN-UP CALL
        const res = await axios.post('/api/user/register', { name, email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      } else {
        // LOGIN CALL
        const res = await axios.post('/api/user/login', { email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      }

      // clear fields
      setName('')
      setPassword('')
      setEmail('')

    } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message); // ⭐ real backend error
    } else {
      toast.error("Something went wrong");
    }
  }}
  // console.log("Backend URL:", backendUrl);


  // ONLY redirect when token becomes available
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

 

  return (
    <div className=' flex justify-center  items-center pt-18 mb-18'>
      <div className='flex flex-col  w-full md:w-1/2'>
        
        <div className="flex justify-center gap-2 items-center mb-2">
          <p className="pl-12 text-4xl py-6 prata-regular text-black dark:text-white">
            {isSignUp ? "Sign Up" : "Login"}
          </p>
          <p className="w-10 sm:w-12 h-[2px] dark:bg-white bg-black"></p>
        </div>

        <form onSubmit={submitHandler}>

          {isSignUp && (
            <div className='flex flex-col px-4 py-4 gap-4 w-full'>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                className="border px-4 py-2 placeholder:text-gray-500"
                type="text"
                placeholder='Name'
              />
            </div>
          )}

          <div className='flex flex-col px-4 gap-4 w-full'>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border px-4 py-2 placeholder:text-gray-500"
              type="email"
              placeholder='Email'
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border px-4 py-2 placeholder:text-gray-500"
              type="password"
              placeholder='Password'
            />
          </div>

          <div className='flex justify-between cursor-pointer py-2 mx-4'>
            <p className='text-black dark:text-gray-300'>Forgot password?</p>

            <p
              className="text-black dark:text-gray-300"
              onClick={toggleForm}
            >
              {isSignUp ? "Login" : "Create account"}
            </p>
          </div>

          <div className='flex justify-center mt-2'>
            <button
              type="submit"
              className='bg-gray-800 text-white px-8 py-2 hover:bg-gray-900'
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login
