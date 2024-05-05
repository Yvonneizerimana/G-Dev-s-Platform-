import adminModel from "../models/admin.model.js";
import profileModel from "../models/createProfile.model.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../errors/async.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import sgMail from '@sendgrid/mail';
import configurations from '../configs/index.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import fs from 'fs'



export const admin = {
    createAdmin: asyncWrapper(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new BadRequestError(errors.array()[0].msg));
        }
        const foundUser = await adminModel.findOne({ email: req.body.email });
    if (foundUser) {
        return next(new BadRequestError("Email already in use"));
    };
        
            // Send response before sending email

            try {
                const otpGenerator=()=>{
                    var otp=0;
                    otp=Math.ceil(Math.random()*1000000)
                    return otp
                }
                const otp=otpGenerator()
                adminModel.otpExpires=Date.now() + 8 * 60 * 1000;
                
                const addAdmin = new adminModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber:req.body.phoneNumber,
                    role:req.body.role,
                    password:req.body.password,
                    otp: otp,
                    otpExpires: req.body.otpExpires,
                    
                });
            
                const savedUser = await addAdmin.save();

                //sending email containing otp
                const sendGridKey = configurations.SENDGRID_KEY;
                sgMail.setApiKey(sendGridKey);

                const mailOptions = {
                    from: 'yvannyizerimana@gmail.com', // sender address
                    to: req.body.email, // receiver address
                    subject: 'Welcome to our platform', // Subject line
                    html: `Thank you for creating an account!<br><br>enter this numbers to verify your account: <br><br><B> ${otp}<B>` // email body
                };

                await sgMail.send(mailOptions);
                console.log('Email sent successfully');
                
        if (savedUser) {
            return res.status(201).json({
                message: "User account created!",
                user: savedUser
            });
        }
            } catch (error) {
                console.error('Error creating a user:', error.message);
        }

        
    }),

//validate otp

ValidateOpt:asyncWrapper(async(req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new BadRequestError(errors.array()[0].msg));
        }
    
        // Checking if the given opt is stored in our database
        const foundUser = await adminModel.findOne({ otp: req.body.otp });
        if (!foundUser) {
            next(new UnauthorizedError('Authorization denied'));
        };
    
        // Checking if the otp is expired or not.
        if (foundUser.otpExpires < new Date().getTime()) {
            next(new UnauthorizedError('OTP expired'));
        }
       
        // Updating the user to verified
        foundUser.verified = true;
        const savedUser = await foundUser.save();
    
        if (savedUser) {
            return res.status(201).json({
                message: "User account verified!",
                user: savedUser
            });
        }
    }),

//user sign in

loginUser: async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email as username and password');
    }

    const user=await adminModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

   const validation=await bcrypt.compareSync(password, user.password);
   if(!validation){
    res.status(401).json({ message: "Invalid password" });
   }
    if (user&&validation){
      const accessToken = jwt.sign({
        email: user.email,
        id: user._id
      }, configurations.TOOKEN_SECRETE, { expiresIn: "3h" });

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };
      res.status(200).cookie("token", accessToken, options).json({ user: user.firstName + user.lastName });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
},

//logout

logout: (req, res) => {
    res.clearCookie("token");
    res.status(200).json("Logout Success");
  },

  //forgot password

  forgotPassword: async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await adminModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      function generateRandomToken() {
        return crypto.randomBytes(20).toString('hex');
      }
      const resetToken = generateRandomToken();
      user.resetToken = resetToken;
      user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
      await user.save();

      const sendGridKey = configurations.SENDGRID_KEY;
                sgMail.setApiKey(sendGridKey);

                const mailOptions = {
                    from: 'yvannyizerimana@gmail.com', // sender address
                    to: req.body.email, // receiver address
                    subject: 'Welcome to our platform', // Subject line
                    html: `please click here to reset your password: <br><br><B>http://localhost:9000/resetPassword/${resetToken}<B>` // email body
                };

                await sgMail.send(mailOptions);
                res.status(200).send(`Password reset email sent successfuly`);
                console.log('Email sent successfully');
    } catch (error) {
      console.error('Error requesting password reset:', error.message);
      res.status(500).send('Internal server error');
    }
  },


  //reset password

  resetPassword: async (req, res) => {
    const token  = req.params.resetToken;
    
  
    try {
        // Find user by reset token
        const user = await adminModel.findOne({ resetToken: token });
  
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
  
        // Check if token is expired
        if (user.resetTokenExpires < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }
  if(token===user.resetToken) {
    const { password } = req.body;
  
        // reset user's password
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();
  
        return res.status(200).json({ message: 'Password reseted successfully' });}
        else{
          return res.json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  },

  listOfAllUsers: async(req,res,next)=>{
  const allUsers=await profileModel.find();
  if(allUsers){
    return res.status(200).json({
      numberOfProfiles: allUsers.length,
      listOfAllUsers: allUsers
    });
  }
  },

  listUsersByStatus:async(req,res,next)=>{
    const allUsers=await profileModel.find({status:req.query.status});
    if(allUsers){
      return res.status(200).json({
        numberOfProfiles: allUsers.length,
        listOfAllUsers: allUsers
      });
    }
  },

  listProfileById:async(req,res,next)=>{
    const profile=await profileModel.findById(req.query.id);

    if(profile){
      return res.status(200).json({
       
         profile
      });
    }
  },

  updateProfile:async(req,res,next)=>{
    const profile=await profileModel.findByIdAndUpdate(req.query.id);
    if(profile){
      profile.status=req.body.status;
      const savedProfile=await profile.save();
      if(savedProfile){
        return res.status(200).json({
          message: "Status updated successfully",
          profile:savedProfile
        });
      }
    }
  },
  deleProfile:async(req,res,next) => {
    const profile=await profileModel.findOneAndDelete({status:req.query.status});
    if(profile){
      return res.status(200).json({
        message: "Profile deleted successfully",
        profile:profile
      });
    }
  },

 verifyProfile:async(req, res, next)=> {
    try {
        const document = await profileModel.findOne({ uploadDocuments: req.query.file });
        
        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }
if(document){
        const fileContents = []; 

      
        for (const filePath of document.documentPath) {
            
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    message: `File not found at path: ${filePath}`
                });
            }

            
            const fileContent = fs.readFileSync(filePath,'utf8');
            
          
            fileContents.push({ filePath, content: fileContent });
        }
//change status to true if profile verfied well

         document.status="Profile in review"
         await document.save();

//get response to admin

        res.status(200).json({
        
            message: 'File contents retrieved successfully',
            files: fileContents
        });
        
      }
      
    } catch (error) {
        
        console.error('Error:', error);
        res.status(500).json({
            message: `Internal server error: ${error.message}`
        });
    }
  },


  //approve profile

   approved:async(req,res)=>{
    const profile = await profileModel.findOne({ _id: req.query.id});
    if (profile.status === 'Profile in review'){
      const sendGridKey = configurations.SENDGRID_KEY;
      sgMail.setApiKey(sendGridKey);

      const mailOptions = {
        from: 'yvannyizerimana@gmail.com', // sender address
        to: profile.personalInformation.email, // receiver address
        subject: 'Profile Approved', // Subject line
        html: `your account has verfied and posted to public` // email body
      };

      await sgMail.send(mailOptions);
      console.log('Email sent successfully');
      res.status(200).json({message:'profile approved'});
    }
    profile.status ="approved";
    await profile.save();
  },

    //reject profile

    rejected:async(req,res)=>{
      const profile = await profileModel.findOne({ _id: req.query.id});
      if (profile.status === "Profile in reveiew"){
        const sendGridKey = configurations.SENDGRID_KEY;
        sgMail.setApiKey(sendGridKey);
  
        const mailOptions = {
          from: 'yvannyizerimana@gmail.com', // sender address
          to: profile.personalInformation.email, // receiver address
          subject: 'Profile Rejected', // Subject line
          html: `thank you for your time, after carefuly consideration <br> we regerete to inform you that your profile<br> has rejected and we encourage to keep learning<br> our platform will be ready to receive your profile next.  ` // email body
        };
  
        await sgMail.send(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({message:'profile rejected'});
      }
    profile.status ="rejected";
    await profile.save();
    },



}
export default admin 
