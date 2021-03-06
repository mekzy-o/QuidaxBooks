import { check, validationResult } from 'express-validator';
import Response from '../../libraries/response';

export default {
  userValidation: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters'),
    (req, _res, next) => {
      const errors = validationResult(req);
      const errorMessage = errors.errors[0];
      if (!errors.errors.length) {
        return next();
      }
      throw Response.applicationError(
        errorMessage.msg,
      );
    },
  ],
};
