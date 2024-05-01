import adminRouter from "./admin.route.js";
import userRouter from "./user.route.js";
import profileRouter from "./createProfile.route.js";
import express from "express";

const router = express.Router();
router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/profile',profileRouter);
export default router;

