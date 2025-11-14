import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import { generateToken } from "../config/jwt.js"

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

        // EMAIL VALIDATION
        if(!validator.isEmail(email)){
            return res.status(400).json("Please provide a valid email")
        }

        // PASSWORD VALIDATION
        if(!validator.isStrongPassword(password)){
            return res.status(400).json("Think of a stonger password")
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

    const {username,password} = req.body

    if(!username || !password){
        return res.status(400).json("Please fill in all the required fields")
    }

    try {
        const usernameMatch = await userModel.findOne({username})
        
        if(!usernameMatch){
            return res.status(400).json("Incorrect username")
        }

        // PASSWORD UNHASHING
        const passwordMatch = await bcrypt.compare(password,usernameMatch.password)

        if(!passwordMatch){
            return res.status(400).json("Incorrect password")
        }

        // CREATE TOKEN IF THE USER CREDENTIALS ARE VALID
        const token = generateToken(usernameMatch.username)

        res.status(200).json({msg : "Successfull login",token})
        
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