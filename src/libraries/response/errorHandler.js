/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';
import { errorResponse } from './httpResponse';

const isProduction = process.env.NODE_ENV === 'production';

export const errorHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  let { message } = error;
  let statusCode = error.status || 400;
  const data = {
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
    ...(!isProduction && { trace: error.stack }),
  };

  if (error instanceof yup.ValidationError) {
    statusCode = 422;
    message = error.errors[0];
  }

  return errorResponse(response, statusCode, message, data);
};
