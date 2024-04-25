import {body} from 'express-validator'
export const otpValidation = [
    body("otp", "Otp must be provided").not().isEmpty(),
];