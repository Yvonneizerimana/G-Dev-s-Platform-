import adminModel from "../models/admin.model.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../errors/async.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import sgMail from '@sendgrid/mail';
import configurations from '../configs/index.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'


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
    // Check if email and password are provided
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // Find user by email
    const user = await adminModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    if(user.verified!==true){
      res.status(401).json({ message: "Please verify your account" });
      return;

    }

    // Compare hashed password with user input
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // If user and password are valid, generate JWT token
    const accessToken = jwt.sign({
      email: user.email,
      id: user._id
    },"yvonne123",{ expiresIn: "30m" });

    // Set token as a cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    res.status(200).cookie("token", accessToken, options).send(`Welcome to the platform ${user.firstName} ${user.lastName}`);
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
  }

}

export default admin;
