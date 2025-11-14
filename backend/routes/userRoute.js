import {Router} from "express"
import { signIn, signOut, signUp } from "../controllers/userController.js"

const userRouter = Router()

// USER REGISTER 
userRouter.post("/sign-up",signUp)

// USER LOGIN
userRouter.post("/sign-in",signIn)

// USER LOG OUT
userRouter.post("/sign-out",signOut)

export default userRouter