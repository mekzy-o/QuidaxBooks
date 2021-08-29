import { validationResult, query } from 'express-validator';
import Response from '../../libraries/response';

export default {
  searchValidation: [
    query('query')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('search query cannot be empty')
      .isString()
      .withMessage('search query must be a text or string'),
    query('filter')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('search filter cannot be empty, You can filter by author, title etc')
      .isString()
      .withMessage('search filter must be a text or string'),
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
