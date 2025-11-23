import express from 'express'
import {registerUser,loginUser,adminLogin} from '../controllers/userController.js'

console.log("User route loaded");

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter