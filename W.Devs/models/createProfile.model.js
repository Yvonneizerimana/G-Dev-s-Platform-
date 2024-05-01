import { model, Schema} from 'mongoose';

const profileSchema = new Schema({
    personalInformation: {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        countryCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    education: {
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldOfStudy: {
            type: String,
            required: true
        }
    },
    codingExperience: {
        company: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    selectLevelOfCoding: {
        type: String,
        required: true,
        enum: {
            values: ['Beginner', 'Intermediate', 'Advanced'],
            message: "Invalid level of coding selected: {VALUE}"
        }
    },
    completeChallenge: {
        type: String,
        required: false
    },
    uploadDocuments: {
        type: Array,
        required:true
    },
    documentPath:{
        type:Array,
        required:true,
 }
});

export default model("Profile", profileSchema);
