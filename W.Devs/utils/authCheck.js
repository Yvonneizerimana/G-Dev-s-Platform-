import registerUserModel from "../models/admin.model.js";
import configurations from '../configs/index.js'
import jwt from "jsonwebtoken";

const checkUsers={

    //admin check
     admin:async (req, res, next) => {
    const tokenn = req.cookies.token;
    try {
        if (!tokenn) {
            return res.status(401).json({ success: false, message: "Access token not found" });
        }

        try {
            const payload = jwt.verify(tokenn, configurations.TOOKEN_SECRETE); 
            const email = payload.email;

            const user = await registerUserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            if (user.role !== "admin") {
                return res.status(403).json({ success: false, message: "Access denied you're not authorized as admin" });
            }

    
            res.status(200).json({ success: true, message: "Access granted" });
            
        } catch (error) {
            console.log(error.message);
            return res.status(401).json({ success: false, message: "Invalid access token" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
},

//user check

user:async (req, res, next) => {
    const tokenn = req.cookies.token;
    try {
        if (!tokenn) {
            return res.status(401).json({ success: false, message: "Access token not found" });
        }

        try {
            const payload = jwt.verify(tokenn, configurations.TOOKEN_SECRETE); 
            const email = payload.email;

            const user = await registerUserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            if (user.role !== "user") {
                return res.status(403).json({ success: false, message: "Access denied you're not authorized as a user" });
            }

    
            res.status(200).json({ success: true, message: "Access granted" });
            
        } catch (error) {
            console.log(error.message);
            return res.status(401).json({ success: false, message: "Invalid access token" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
}

export default checkUsers;
