import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

// REGISTER
export const signUp = async(req,res)=>{
    const {name,username,password,email}  = req.body

    if(!name || !username || !password || !email){
        return res.status(400).json("Please fill in all the fields")
    }

    try {
        // EXISTING EMAIL
        const existingEmail =  await userModel.find({email})
        if(existingEmail.length > 0){
            return res.status(400).json("Our records show that this email has already been registered")
        }

        // EXISTING EMAIL
        const existingUsername =  await userModel.find({username})
        if(existingUsername.length > 0){
            return res.status(400).json("This username is unavailable. Try another")
        }

        // HASHING THE PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({name,username,email,password:hashPassword})
        res.status(201).json("Account created successfully")

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// LOGIN
export const signIn = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// LOGOUT
export const signOut = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}