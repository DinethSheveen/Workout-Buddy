import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import { generateToken } from "../config/jwt.js"
import { Types } from "mongoose"

// REGISTER
export const signUp = async(req,res)=>{
    const {name,username,password,email}  = req.body

    if(!name || !username || !password || !email){
        return res.status(400).json({message:"Please fill in all the fields", register : false})
    }

    try {
        // EXISTING EMAIL
        const existingEmail =  await userModel.find({email})
        if(existingEmail.length > 0){
            return res.status(400).json({message:"Our records show that this email has already been registered", register : false})
        }

        // EXISTING EMAIL
        const existingUsername =  await userModel.find({username})
        if(existingUsername.length > 0){
            return res.status(400).json({message : "This username is unavailable. Try another", register : false})
        }

        // EMAIL VALIDATION
        if(!validator.isEmail(email)){
            return res.status(400).json({message : "Please provide a valid email", register : false})
        }

        // PASSWORD VALIDATION
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message : "Think of a stonger password", register : false})
        }

        // HASHING THE PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({name,username,email,password:hashPassword})

        res.status(201).json({message : "Account created successfully", register : true})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// LOGIN
export const signIn = async(req,res)=>{

    const {username,password} = req.body

    if(!username || !password){
        return res.status(400).json({message: "Please fill in all the required fields",login:false})
    }

    try {
        const usernameMatch = await userModel.findOne({username})
        
        if(!usernameMatch){
            return res.status(400).json({message: "Incorrect username",login:false})
        }

        // PASSWORD UNHASHING
        const passwordMatch = await bcrypt.compare(password,usernameMatch.password)

        if(!passwordMatch){
            return res.status(400).json({message: "Incorrect password",login:false})
        }

        // CREATE TOKEN IF THE USER CREDENTIALS ARE VALID
        const token = generateToken(usernameMatch.username)

        res.status(200).json({message : "Successfull login",token,login:true,user:usernameMatch})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// LOGOUT
export const signOut = async(_,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// RETREIVE USER BY ID
export const getOneUser = async(req,res)=>{
    const userId = req.params.id

    if(!userId){
        return res.status(400).json({message : "Missing user Id"})
    }

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user Id"})
    }

    try {
        const user = await userModel.findById(userId)

        if(!user){
            return res.status(400).json({message:"No user with this id"})
        }

        res.status(200).json({message : "User retreived",user})

    } catch (error) {
        res.status(500).json({message:error})
    }
}

// UPDATE USER
// export const updateUser = async(req,res)=>{
//     const {username,email,password} = req.body
//     const userId = req.params.id

//     if(!username || !email || !password){
//         return res.status(400).json({message:"Please fill in all fields"})
//     }

//     try {
//         const existingUsername = await userModel.findOne({username})

//         if(existingUsername){
//             return res.status(400).json({message:"Username already exists. Choose another"})
//         }

//         const existingEmail = await userModel.findOne({email}) 

//         if(existingEmail){
//             return res.status(400).json({message:"Email address already exists"})
//         }

//         if(!validator.isStrongPassword(password)){
//             return res.status(400).json({message:"Choose a strong password"})
//         }

        

//     } catch (error) {
//         res.status(500).json({message:error})
//     }

// }
