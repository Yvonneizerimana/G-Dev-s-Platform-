import adminController from "../controllers/admin.controller.js";
import authValidation from "../middlewares/authValidation.js"
import { otpValidation } from "../utils/validation.js";
import express from 'express';
const app= express();
app.use(express.json)


const adminRouter = express.Router();

adminRouter.route('/create').post(authValidation,adminController.createAdmin);
adminRouter.route('/verify').post(otpValidation, adminController.ValidateOpt);
adminRouter.route('/login').post(adminController.loginUser);
adminRouter.route('/forgotPassword').post(adminController.forgotPassword)
adminRouter.route('/resetPassword/:resetToken').post(adminController.resetPassword)

export default adminRouter