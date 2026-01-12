import express from 'express'
import { userLogin,userSignup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login",userLogin);
userRouter.post("/signup",userSignup);

export default userRouter;