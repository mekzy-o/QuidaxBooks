import * as yup from 'yup';

/**
  * @function userValidator
  * @description validator for validating user login and registration
  */
const userValidator = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .noUnknown();

export default userValidator;
