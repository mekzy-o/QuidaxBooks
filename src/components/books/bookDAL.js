/* eslint-disable import/prefer-default-export */
import { Op, Sequelize } from 'sequelize';
import db from '../../database/models';

export const getFeaturedBooks = async ({ limit, offset }) => {
  const books = await db.Book.findAndCountAll({ where: { featured: true }, limit, offset });
  return books;
};

export const getSingleBook = async (slug) => {
  const book = await db.Book.findAll({ where: { slug } });
  return book;
};

export const searchBookByFilter = async (keyword, filter, limit, offset) => {
  const books = await db.Book.findAndCountAll({
    where: {
      [Op.or]: [
        {
          [filter]: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
    limit,
    offset,
  });
  return books;
};
