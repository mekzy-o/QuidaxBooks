import db from '../../database/models';

/**
   * @description data access layer (DAL) to return created user
   * @method createUser
   *
   * @param {Object} body
   *
   * @returns {Object}
   */
const createUser = async (data) => {
  const user = await db.User.create(data);
  return user;
};

/**
   * @description data access layer to get user by email
   * @method getUserByEmail
   *
   * @param {string} email
   *
   * @returns {Object}
   */
const getUserByEmail = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  return user;
};

export { createUser, getUserByEmail };
