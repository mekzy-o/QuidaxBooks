/* eslint-disable import/prefer-default-export */
import Response from '../response';

export const sessionCheck = async (req, res, next) => {
  if (!req.session.userId) {
    return Response.errorResponse(res, 500, "Can't access route, please make sure you are logged in");
  }
  return next();
};
