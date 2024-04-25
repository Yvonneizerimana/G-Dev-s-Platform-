import {model, Schema} from 'mongoose'

const userSchema = new Schema({
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
        required: true
    },
    phoneNumber:{
     type: 'string',
     required: true
    },
    role:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    }

})

export default model("user", userSchema);