import asyncWrapper from "../errors/async.js";
import profileModel from "../models/createProfile.model.js";
import { validationResult } from "express-validator";
import sgMail from '@sendgrid/mail'
import configurations from "../configs/index.js"

const profileController = {

    //create profile 

    createProfile: asyncWrapper(async (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Determine completeChallenge link based on coding level
            const kata8 = "https://www.codewars.com/kata/search/?q=&r%5B%5D=-8&beta=false&order_by=sort_date%20desc";
            const kata6 = "https://www.codewars.com/kata/search/?q=&r%5B%5D=-6&beta=false&order_by=sort_date%20desc";
            const kata4 = "https://www.codewars.com/kata/search/?q=&beta=false&order_by=sort_date%20desc";
            
            if(req.body.selectLevelOfCoding === "Beginner"){
                req.body.completeChallenge = kata8;
            } else if(req.body.selectLevelOfCoding === "Intermediate"){
                req.body.completeChallenge = kata6;
            } else if(req.body.selectLevelOfCoding === "Advanced"){
                req.body.completeChallenge = kata4;
            }

            // Handle file upload
            if(req.files){
                req.body.uploadDocuments = req.files.map(file => file.filename);
                req.body.documentPath = req.files.map(file => file.path);
            }
            
            // Create profile
            const createProfile = await profileModel.create(req.body);
            //sending email containing the username and id of the user
            const sendGridKey = configurations.SENDGRID_KEY;
      sgMail.setApiKey(sendGridKey);

      const mailOptions = {
        from: 'yvannyizerimana@gmail.com', // sender address
        to: req.body.personalInformation.email, // receiver address
        subject: 'Profile verification', // Subject line
        html: `this account is waiting to be verfied <br>the username is ${ req.body.personalInformation.email}` // email body
      };

      await sgMail.send(mailOptions);
      console.log('Email sent successfully');

            if(createProfile){
                   res.status(201).json({
                    message: "Profile created successfully. Please wait for admin approval in order to be in public.",
                    
                    
                });
            }
        } catch (error) {
            console.error("Error creating user:", error.message);
            res.status(500).json({ message: "Error creating a user" });
        }
    }),


    //view your profile

    viewProfile:asyncWrapper(async(req,res,next)=>{
        const profile = await profileModel.findByIdAndUpdate({_id:req.query.id});
        if(profile){
            res.status(200).json({
                Status: profile.status,
                profile
            });
        } else {
            res.status(404).json({
                message: "Profile not found"
            });
        }
    }),

    //update profile

    updateProfile: asyncWrapper(async(req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const profile = await profileModel.findById({_id:req.query.id});
        if(profile){
            // profile.personalInformation.firstName = req.body.firstName,
            // profile.personalInformation.middleName = req.body.middleName
            // profile.personalInformation.lastName = req.body.lastName,
            // profile.personalInformation.countryCode = req.body.countryCode,
            // profile.personalInformation.phoneNumber = req.body.phoneNumber,
            // profile.personalInformation.email = req.body.email,
            // profile.education.school=req.body.school,
            // profile.education.degree= req.body.degree,
            // profile.education.fieldOfStudy= req.body.fieldOfStudy,
            // profile.codingExperience.company = req.body.company,
            // profile.codingExperience.position = req.body.position,
            // profile.codingExperience.startDate = req.body.startDate,
            // profile.codingExperience.endDate = req.body.endDate,
            // profile.codingExperience.description = req.body.description,
            profile.selectLanguage = req.body.selectLanguage
            // profile.selectLevelOfCoding = req.body.selectLevelOfCoding,
            profile.codewarUsername = req.body.codewarUsername,
            profile.uploadDocuments = req.files.map(file => file.filename);
            profile.documentPath = req.files.map(file => file.path);

            await profile.save();
            res.status(200).json({
                profile
            });
        }
    }),


    //delete profile


    deleteProfile: asyncWrapper(async(req,res,next)=>{
        const profile = await profileModel.findByIdAndDelete({_id:req.query.id});
        if(profile){
            res.status(200).json({
                message: "Profile deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Profile not found"
            });
        }
    }),

    viewApproved: asyncWrapper(async (req, res, next) => {
        const search = await profileModel.find({
            "personalInformation.firstName": req.body.firstName,
            "personalInformation.lastName": req.body.lastName
        });
    
        if (search.length > 0) {
            // Assuming status is a property of each profile document
            const approvedProfiles = search.filter(profile => profile.status === "approved");
    
            if (approvedProfiles.length > 0) {
                res.status(200).json({
                    profiles: approvedProfiles
            // "approvedProfiles.personalInformation.firstName",
            // " approvedProfiles.personalInformation.middleName" ,
            //  "approvedProfiles.personalInformation.lastName" : req.body.lastName,
            //  "approvedProfiles.personalInformation.countryCode" : req.body.countryCode,
            //  "approvedProfiles.personalInformation.phoneNumber" : req.body.phoneNumber,
            //  "approvedProfiles.personalInformation.email" : req.body.email,
            //  "approvedProfiles.education.school":req.body.school,
            // " approvedProfiles.education.degree": req.body.degree,
            //  "approvedProfiles.education.fieldOfStudy":req.body.fieldOfStudy,
            // " approvedProfiles.codingExperience.company" :req.body.company,
            //  "approvedProfiles.codingExperience.position" :req.body.position,
            //  "approvedProfiles.codingExperience.startDate" : req.body.startDate,
            // "approvedProfiles.codingExperience.endDate" : req.body.endDate,
            // "approvedProfiles.codingExperience.description" : req.body.description,
            // "approvedProfiles.selectLanguage ": req.body.selectLanguage,
            // "approvedProfiles.selectLevelOfCoding" : req.body.selectLevelOfCoding,
                    
                });
            } else {
                res.status(404).json({
                    message: "No approved profiles found"
                });
            }
        } else {
            res.status(404).json({
                message: "Profile not found"
            });
        }
    })
    
}

export default profileController;
