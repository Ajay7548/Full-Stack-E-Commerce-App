import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems,} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const isVerifying = React.useRef(false)

    const verifyPayment = async () => {
        try {

            if (!token) {
                return null
            }

            if (isVerifying.current) return
            isVerifying.current = true

            const response = await axios.post('/api/order/verifyStripe', { success, orderId }, { headers: { token } })

            if (response.data.success) {
                setCartItems({})
                navigate('/order')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong");
            isVerifying.current = false
        }
    }

    useEffect(() => {
        if (token && !isVerifying.current) {
            verifyPayment()
        }
    }, [token])

    return (
        <div>

        </div>
    )
}

export default Verify
