import adminController from "../controllers/admin.controller.js";
import authValidation from "../middlewares/authValidation.js"
import { otpValidation } from "../utils/validation.js";
import userController from '../controllers/admin.controller.js'
import express from 'express';
const app= express();
app.use(express.json)


const adminRouter = express.Router();

adminRouter.route('/create').post(authValidation,adminController.createAdmin);
adminRouter.route('/verify').post(otpValidation, adminController.ValidateOpt);
adminRouter.route('/login').post(adminController.loginUser);
adminRouter.route('/forgotPassword').post(adminController.forgotPassword)
adminRouter.route('/resetPassword/:resetToken').post(adminController.resetPassword)
adminRouter.route('/logout').get(adminController.logout);


adminRouter.route('/listOfAllUsers').get(userController.listOfAllUsers)
adminRouter.route('/listProfileById').get(userController.listProfileById)
adminRouter.route('/verifyProfile').get(userController.verifyProfile)
adminRouter.route('/approved').get(userController.approved)
adminRouter.route('/rejected').get(userController.rejected)
adminRouter.route('/updateProfile').get(userController.updateProfile)
adminRouter.route('/deleteProfile').get(userController.deleProfile)
adminRouter.route('/listUsersByStatus').get(userController.listUsersByStatus)

export default adminRouter  