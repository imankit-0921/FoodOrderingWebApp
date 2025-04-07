import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ success:false, message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ success:false, message: "Invalid credentials" })
        }
        const token = jwt.sign({id: existingUser._id }, process.env.JWT_SECRET)
        res.status(200).json({ success:true, result: existingUser, token })
    } catch (err) {
        res.status(500).json({ success:false, message: err.message })
    }
}   

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success:false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success:false, message: "Invalid email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success:false, message: "Password is not strong enough" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ name, email, password: hashedPassword })
        const user  = await newUser.save()
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({ success:true, user, token })
    } catch (err) {
        res.status(500).json({ success:false, message: err.message })
    }
}

export {loginUser,registerUser}