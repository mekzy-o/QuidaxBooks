/* eslint-disable import/prefer-default-export */
import db from '../../database/models';

export const addRating = async (data) => {
  const rate = await db.Rate.create(data);
  return rate;
};

export const getUserRating = async (id) => {
  const rate = await db.Rate.findAll({ where: { userId: id } });
  return rate;
};

export const getBookRating = async (slug) => {
  const rate = await db.Rate.findAll({
    where: { bookSlug: slug },
  });
  return rate;
};
