import db from '../../database/models';

const createUser = async (data) => {
  const user = await db.User.create(data);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  return user;
};

export { createUser, getUserByEmail };
