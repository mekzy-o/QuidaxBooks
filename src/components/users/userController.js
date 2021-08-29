import Response from '../../libraries/response';
import { loginUserService, registerUserService } from './userServices';

export const registerUser = async (req, res, next) => {
  try {
    const data = await registerUserService(req.body);
    return Response.successResponse(
      res,
      'You have successfully registered with our platform.',
      data,
      201,
    );
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await loginUserService(req.body);
    const { session } = req;
    const { id, email } = data;
    session.userId = id;
    session.email = email;
    session.cart = {};
    return Response.successResponse(
      res,
      'You have successfully logged in',
      data,
    );
  } catch (error) {
    return next(error);
  }
};
