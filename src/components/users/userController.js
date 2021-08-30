import Response from '../../libraries/response';
import { loginUserService, registerUserService } from './userServices';

/**
   * @description controller for creating new user
   * @method registerUser
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
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

/**
   * @description controller for signing existing user
   * @method loginUser
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
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

/**
   * @description controller for logging out existing user
   * @method logoutUser
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const logoutUser = async (req, res, next) => {
  try {
    if (req.session.userId) {
      req.session.destroy();
      // clean up!
      return Response.successResponse(
        res,
        'You have successfully logged out',
      );
    }
    return Response.successResponse(
      res,
      'No user session!, You are already logged out',
    );
  } catch (error) {
    return next(error);
  }
};
