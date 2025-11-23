import express from 'express'

import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter =express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/place', authUser, (req, res, next) => {
   console.log("ORDER ROUTE HIT");
   next();
}, placeOrder);


orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

orderRouter.get('/userorders',authUser,userOrders)

export default orderRouter