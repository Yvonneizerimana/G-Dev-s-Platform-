import { body } from 'express-validator';

const authValidation = [
    body('firstName', 'First name is required').not().isEmpty(),
    body('firstName').custom((value) => {
        if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
            throw new Error('First name must start with an uppercase letter');
        }
        return true;
    }),

    body('lastName', 'Last name is required and must be in uppercase')
        .not().isEmpty()
        .custom((value) => {
            if (value !== value.toUpperCase()) {
                throw new Error('Last name must be in uppercase');
            }
            return true;
        }),

    body('email', 'Email is required').isEmail(),
    body('phoneNumber', 'Phone number is required').not().isEmpty().matches(/^\d+$/).withMessage('Phone number should contain only digits').isLength({ max: 13, min: 10 }).isMobilePhone(),
    body('password', 'Password is required and should have at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character').not().isEmpty().isLength({ min: 8, max: 20 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/),
    body('role', 'Role is required').not().isEmpty()
];

export default authValidation;
