import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState({})

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
        console.log('Fetched orders:', response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value
    console.log('Status handler called:', { orderId, newStatus })
    // console.log('Backend URL:', backendUrl)
    console.log('Token:', token ? 'exists' : 'missing')
    
    // Prevent multiple simultaneous updates
    if (loading[orderId]) {
      console.log('Already updating this order')
      return
    }

    setLoading(prev => ({ ...prev, [orderId]: true }))
    
    try {
      // console.log('Sending request to:','/api/order/status')
      
      const response = await axios.post(`${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      )
      
      console.log('Backend response:', response)
      console.log('Response data:', response.data)
      
      if (response.data.success) {
        // Update local state after successful backend update
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
        toast.success('Order status updated successfully')
      } else {
        toast.error(response.data.message || 'Failed to update status')
        // Refresh to get correct state
        await fetchAllOrders()
      }
    } catch (error) {
      console.error('Status update error:', error)
      console.error('Error response:', error.response)
      console.error('Error message:', error.message)
      toast.error(error.response?.data?.message || error.message || 'Failed to update status')
      // Refresh to get correct state
      await fetchAllOrders()
    } finally {
      setLoading(prev => ({ ...prev, [orderId]: false }))
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-start">
              {/* Package Icon */}
              <div className="flex justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>

              {/* Order Details */}
              <div className="space-y-2">
                <div>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-700">
                      {item.name} x {item.quantity} <span className="text-gray-500">{item.size}</span>
                      {idx < order.items.length - 1 && ', '}
                    </p>
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                  <p className="mt-1">Phone: {order.address.phone}</p>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Items: {order.items.length}</p>
                  <p>Payment Method: {order.paymentMethod.toUpperCase()}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Amount and Status */}
              <div className="flex flex-col items-end gap-3">
                <p className="text-xl font-bold text-gray-800">${order.amount}</p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  disabled={loading[order._id]}
                  className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${loading[order._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders