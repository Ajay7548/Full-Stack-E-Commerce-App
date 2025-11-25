import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Login = ({ setToken }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post(`${backendUrl}/api/user/admin`, { email, password })
      if (res.data.success) {
        setToken(res.data.token)
        toast.success('Login Successful')
      } else {
        toast.error(res.data.message)
      }
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md w-full py-2 px-4 outline-none border border-gray-300' type="text" placeholder='your@email.com' />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full py-2 px-4 outline-none border border-gray-300' type="password" placeholder='Enter you password' />
          </div>
          <button className='mt-4 hover:bg-gray-800 font-semibold w-full py-2 px-6 rounded-md bg-black text-white' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login