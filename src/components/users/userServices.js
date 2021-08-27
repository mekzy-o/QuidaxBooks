/* eslint-disable max-len */
import argon2 from 'argon2';
import Response from '../../libraries/response';
import * as User from './userDAL';
import { filterOutPassword } from '../../utils/filterOutPassword';
import userValidator from './userValidator';

/**
  * @function registerUserService
  * @description creates a new user
  * @param {*} data represent user details
  * @returns {object} user object representing newly created user
  */
export const registerUserService = async (body) => {
  await userValidator.validate(body, { strict: true });
  const { email, password } = body;
  const foundUser = await User.getUserByEmail(email);

  if (foundUser) {
    throw Response.applicationError('User with this email already exists');
  }

  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

  const createdUser = await User.createUser({ ...body, password: hashedPassword });
  if (!createdUser) {
    throw Response.applicationError('User not created for some reason');
  }
  return { ...filterOutPassword(createdUser) };
};

/**
  * @function loginUserService
  * @description logs in a user service
  * @param {*} data represent user details
  * @returns {object} user object
  */
export const loginUserService = async (body) => {
  await userValidator.validate(body, { strict: true });
  const { email, password } = body;
  const foundUser = await User.getUserByEmail(email);
  if (!foundUser) {
    throw Response.applicationError('User with this email does not exist');
  }

  const verifyPassword = await argon2.verify(foundUser.password, password);
  if (!verifyPassword) {
    throw Response.applicationError('Invalid Account details, Please try again');
  }
  return { ...filterOutPassword(foundUser) };
};
