import {Router} from "express"
import { getOneUser, signIn, signOut, signUp, updateUser } from "../controllers/userController.js"

const userRouter = Router()

// USER REGISTER 
userRouter.post("/sign-up",signUp)

// USER LOGIN
userRouter.post("/sign-in",signIn)

// USER LOG OUT
userRouter.post("/sign-out",signOut)

// RETREIVE USER
userRouter.get("/:id",getOneUser)

// USERNAME UPDATE
userRouter.put("/update-user/:id",updateUser)

export default userRouter