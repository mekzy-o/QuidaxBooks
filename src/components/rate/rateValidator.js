import { check, validationResult } from 'express-validator';
import Response from '../../libraries/response';

export default {
  rateValidation: [
    check('rate')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('rate of this book cannot be empty')
      .isInt({ min: 1, max: 5 })
      .withMessage('rate must be integers between 1 and 5'),
    (req, res, next) => {
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
