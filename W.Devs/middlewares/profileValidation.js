import {body} from 'express-validator'

const profileValidation=[
    body('personalInformation.firstName','firstName is required').not().isEmpty(),
    body('personalInformation.middleName','middleName is required').not().isEmpty(),
    body('personalInformation.lastName','lastName is required').not().isEmpty(),
    body('personalInformation.countryCode','countryCode is required').not().isEmpty(),
    body('personalInformation.phoneNumber','phoneNumber is required').not().isEmpty().isMobilePhone(), 
    body('personalInformation.email','email is required').not().isEmpty().isEmail(),
    body('education.school','school is required').not().isEmpty(),
    body('education.degree','degree is required').not().isEmpty(),
    body('education.fieldOfStudy','fieldOfStudy is required').not().isEmpty(),
    body('codingExperience.company','company is required').not().isEmpty(),
    body('codingExperience.position','position is required').not().isEmpty(),
    body('codingExperience.startDate','startDate is required').not().isEmpty(),
    body('codingExperience.endDate','endDate is required').not().isEmpty(),
    body('codingExperience.description','description is required').not().isEmpty(),
    body('selectLanguage','Language is required').not().isEmpty(),
    body('selectLevelOfCoding','levelOfCoding is required').not().isEmpty(),
    body('codewarUsername','codewarUsername is required').not().isEmpty(),
    body('uploadDocuments','uploadDocuments is required and only PDF files is allowed').not().isEmpty(),
   

]
  
export default profileValidation;