/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import * as yup from 'yup';

const successResponse = (res, message, data = null) => res
  .status(200).send({
    success: true,
    message,
    data,
  });

const errorResponse = (res, statusCode = 400, message = null, error) => {
  if (error instanceof yup.ValidationError) {
    statusCode = 422;
    message = error.errors[0];
  }

  return res.status(statusCode).send({
    success: false,
    message,
    error,
  });
};

const applicationError = (message) => ({
  message,
});

export { successResponse, errorResponse, applicationError };
