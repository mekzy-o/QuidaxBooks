/* eslint-disable import/prefer-default-export */
import db from '../../database/models';

export const createLike = async (data) => {
  const like = await db.Like.create(data);
  return like;
};
export const getUserLike = async (id, slug) => {
  const like = await db.Like.findAll({ where: { userId: id, bookSlug: slug } });
  return like;
};

export const removeUserLike = async (userId, slug) => {
  const like = await db.Like.destroy({ where: { userId, bookSlug: slug } });
  return like;
};
