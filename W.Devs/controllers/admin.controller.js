import {body} from 'express-validator'

const authoValidation=[
    body('firstName', 'firstName is required and first letter must be in uppercase then next letter to lower case')
    .not().isEmpty()
    .custom((value) => {
        if (value.charAt(0)!==value.charAt(0).toUpperCase()) {
            throw new Error('firstName must start with an uppercase letter followed by lowercase letters');
        }

        return true;
    }),

body('lastName', 'lastName is required and must be in Uppercase')
    .not().isEmpty()
    .custom((value) => {
        if (value!==value.toUpperCase()) {
            throw new Error('lastName must be in uppercase');
        }
        return true;
    }),

    body('email','email is required').isEmail(),
    body('phoneNumber','phoneNumber is required').not().isEmpty().matches(/^\d+$/).withMessage('phoneNumber should contain only digits').isLength({max:13,min:10}).isMobilePhone(),
    body('password','password is reuired and should have at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character').not().isEmpty().isLength({min:8, max:20}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/),
    body('role','role is required').not().isEmpty()
]

export default authoValidation ;