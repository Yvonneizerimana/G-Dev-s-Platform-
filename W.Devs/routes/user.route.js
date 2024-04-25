import userController from "../controllers/user.controller.js";
import authValidation from "../middlewares/authValidation.js"
import { otpValidation } from "../utils/validation.js";
import express from 'express';
const app= express();
app.use(express.json)


const userRouter = express.Router();

userRouter.route('/create').post(authValidation,userController.createUser);
userRouter.route('/verify').post(otpValidation, userController.ValidateOpt);
userRouter.route('/login').post(userController.loginUser);
userRouter.route('/forgotPassword').post(userController.forgotPassword)
userRouter.route('/resetPassword/:resetToken').post(userController.resetPassword)

export default userRouter