/* eslint-disable import/prefer-default-export */
import db from '../../database/models';

/**
   * @description data access layer return create and return user rating of a book
   * @method addRating
   *
   * @param {Object} data
   *
   * @returns {Object}
   */
export const addRating = async (data) => {
  const rate = await db.Rate.create(data);
  return rate;
};

/**
   * @description data access layer to fetch a specific user rating
   * @method getUserRating
   *
   * @param {string} id
   * @param {string} slug
   *
   * @returns {Object}
   */
export const getUserRating = async (id, slug) => {
  const rate = await db.Rate.findAll({ where: { userId: id, bookSlug: slug } });
  return rate;
};

/**
   * @description data access layer to fetch a specific book rating
   * @method getBookRating
   *
   * @param {string} slug
   *
   * @returns {Object}
   */
export const getBookRating = async (slug) => {
  const rate = await db.Rate.findAll({
    where: { bookSlug: slug },
  });
  return rate;
};
