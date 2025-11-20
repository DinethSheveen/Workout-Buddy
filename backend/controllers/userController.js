import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import { generateToken } from "../config/jwt.js"

// REGISTER
export const signUp = async(req,res)=>{
    const {name,username,password,email}  = req.body

    if(!name || !username || !password || !email){
        return res.status(400).json({message:"Please fill in all the fields", success : false})
    }

    try {
        // EXISTING EMAIL
        const existingEmail =  await userModel.find({email})
        if(existingEmail.length > 0){
            return res.status(400).json({message:"Our records show that this email has already been registered", success : false})
        }

        // EXISTING EMAIL
        const existingUsername =  await userModel.find({username})
        if(existingUsername.length > 0){
            return res.status(400).json({message : "This username is unavailable. Try another", success : false})
        }

        // EMAIL VALIDATION
        if(!validator.isEmail(email)){
            return res.status(400).json({message : "Please provide a valid email", success : false})
        }

        // PASSWORD VALIDATION
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message : "Think of a stonger password", success : false})
        }

        // HASHING THE PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({name,username,email,password:hashPassword})

        res.status(201).json({message : "Account created successfully", success : true})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// LOGIN
export const signIn = async(req,res)=>{

    const {username,password} = req.body

    if(!username || !password){
        return res.status(400).json({message: "Please fill in all the required fields",success:false})
    }

    try {
        const usernameMatch = await userModel.findOne({username})
        
        if(!usernameMatch){
            return res.status(400).json({message: "Incorrect username",success:false})
        }

        // PASSWORD UNHASHING
        const passwordMatch = await bcrypt.compare(password,usernameMatch.password)

        if(!passwordMatch){
            return res.status(400).json({message: "Incorrect password",success:false})
        }

        // CREATE TOKEN IF THE USER CREDENTIALS ARE VALID
        const token = generateToken(usernameMatch.username)

        res.status(200).json({msg : "Successfull login",token,success:true})
        
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