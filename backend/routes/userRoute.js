import {Router} from "express"
import { getUser, signIn, signOut, signUp, updateUser } from "../controllers/userController.js"

const userRouter = Router()

// USER REGISTER 
userRouter.post("/sign-up",signUp)

// USER LOGIN
userRouter.post("/sign-in",signIn)

// USER LOG OUT
userRouter.post("/sign-out",signOut)

// RETREIVE USER
userRouter.get("/:id",getUser)

// USERNAME UPDATE
userRouter.put("/update-user",updateUser)

export default userRouter