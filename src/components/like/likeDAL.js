/* eslint-disable import/prefer-default-export */
import db from '../../database/models';

/**
   * @description data access layer to create and return user like to a book
   * @method createLike
   *
   * @param {Object} data
   *
   * @returns {Object}
   */
export const createLike = async (data) => {
  const like = await db.Like.create(data);
  return like;
};

/**
   * @description data access layer to fetch a specific user like
   * @method getUserLike
   *
   * @param {string} id
   * @param {string} slug
   *
   * @returns {Object}
   */
export const getUserLike = async (id, slug) => {
  const like = await db.Like.findAll({ where: { userId: id, bookSlug: slug } });
  return like;
};

/**
   * @description data access layer to remove user like from a book
   * @method removeUserLike
   *
   * @param {string} userId
   * @param {string} slug
   *
   * @returns {Object}
   */
export const removeUserLike = async (userId, slug) => {
  const like = await db.Like.destroy({ where: { userId, bookSlug: slug } });
  return like;
};
