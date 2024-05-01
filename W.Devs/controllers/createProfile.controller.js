import asyncWrapper from "../errors/async.js";
import profileModel from "../models/createProfile.model.js";
// import { validationResult } from "express-validator";

const profileController = {
    createProfile: asyncWrapper(async (req, res, next) => {
        // Check for validation errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        try {
            // Ensure all required fields are present in the request body

            // Determine completeChallenge link based on coding level
            const kata8 = "https://www.codewars.com/kata/search/?q=&r%5B%5D=-8&beta=false&order_by=sort_date%20desc";
            const kata6 = "https://www.codewars.com/kata/search/?q=&r%5B%5D=-6&beta=false&order_by=sort_date%20desc";
            const kata4 = "https://www.codewars.com/kata/search/?q=&beta=false&order_by=sort_date%20desc";
             
            
            if(req.body.selectLevelOfCoding === "Beginner"){
                req.body.completeChallenge = kata8;
            } else if(req.body.selectLevelOfCoding === "Intermediate"){
                req.body.completeChallenge= kata6;
            } else if(req.body.selectLevelOfCoding === "Advanced"){
                req.body.completeChallenge = kata4;
            }

            // Handle file upload
            if(req.files){
                req.body.uploadDocuments = req.files.map(file => file.filename);
                req.body.documentPath = req.files.map(file => file.path);
            }
            
            // Create profile
            const createProfile=profileModel.create(req.body);

            // Save profile
            
if(createProfile){
            res.status(201).json({
                message: "Profile created successfully",
                user: createProfile
            });
        }
        } catch (error) {
            console.error("Error creating user:", error.message);
            res.status(500).json({ message: "Error creating a user" });
        }
    })
};

export default profileController;
