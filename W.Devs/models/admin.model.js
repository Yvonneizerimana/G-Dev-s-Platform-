import {model, Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new Schema({
    firstName:{
        type: 'string',
        required: true
    },
    lastName:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    phoneNumber:{
     type: 'string',
     required: true,
     unique: true
    },
    role:{
        type: 'string',
        default: 'admin',
    },
    password:{
        type: 'string',
        required: true
    },
    otp:{
        type:Number,
        required:true
        
    },
    otpExpires:{
        type:Date,
        required:false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    resetToken:{
        type:String,
        required:false
    },
    resetTokenExpires:{
             type:Date,
            required:false    }


},{
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
timestamps:true
})

adminSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
 })


export default model("admin", adminSchema);