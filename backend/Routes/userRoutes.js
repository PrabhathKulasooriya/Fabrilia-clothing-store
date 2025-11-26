import express from "express";
import { signUp, logIn} from "../controllers/userController.js";    

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);

export default userRouter;