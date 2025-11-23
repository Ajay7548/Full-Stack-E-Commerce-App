import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'


console.log("User controller loaded");


const createToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
    )
}
//Registeration
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill these' })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Enter a valid email' })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Enter a strong password' })

        }

        const hash = await bcrypt.hash(password, 10)
        const userData = await new userModel({ name, email, password: hash })

        const user = await userData.save()
        const token =createToken(user._id)
        res.status(201).json({ success: true, token})
    } catch (error) {
        console.error('Registeration failed:', error.message)
    }


}
//Login
const loginUser = async (req, res, next) => {

    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({success:false,message:'User not exists'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id)
            return res.status(201).json({success:true,token})
        }else{
            return res.status(404).json({success:false,message:'Invalid credentials'})
        }

    } catch (error) {
        console.error('Login Failed',error.message)
        res.json({success:false ,message:error.message})
    }

}
//Admin Login
const adminLogin = async (req, res, next) => {
    try {
        const {email,password} = req.body

        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
            const token  = jwt.sign(email+password,process.env.JWT_SECRET)
            return res.json({success:true,token})
        }else{
            return res.json({success:false,message:"Invalid crdentials"})
        }
        next()
    } catch (error) {
        console.error('Admin Login Failed',error.message)
        res.json({success:false ,message:error.message})
    }
}

export { loginUser, registerUser, adminLogin }