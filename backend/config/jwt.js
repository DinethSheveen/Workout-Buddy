import jwt from "jsonwebtoken"
import "dotenv/config"

// SIGN
export const generateToken = (payload)=>{
    const token = jwt.sign(payload,process.env.SECRET_KEY)
    return token
}

//DECODE

//VERIFY