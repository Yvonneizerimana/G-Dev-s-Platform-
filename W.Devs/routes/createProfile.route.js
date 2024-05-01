import express from 'express';
import profileController from '../controllers/createProfile.controller.js'
const profileRouter=express.Router();
import profile from '../utils/uploadDocument.js';

profileRouter.route('/create').post(profile.array('uploadDocuments', 5),profileController.createProfile);

export default profileRouter;
