/* eslint-disable import/prefer-default-export */
import { Op, Sequelize } from 'sequelize';
import db from '../../database/models';

export const getFeaturedBooks = async ({ limit, offset }) => {
  const books = await db.Book.findAndCountAll({ where: { featured: true }, limit, offset });
  return books;
};

export const getSingleBook = async (id) => {
  const book = await db.Book.findOne({ where: { id } });
  return book;
};

export const searchBookByAuthor = async (keyword) => {
  const books = await db.Book.findAll({
    where: {
      [Op.or]: [
        {
          author: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  });
  return books;
};

export const searchBookByTitle = async (keyword) => {
  const books = await db.Book.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  });
  return books;
};

export const searchBookByGenre = async (keyword) => {
  const books = await db.Book.findAll({
    where: {
      [Op.or]: [
        {
          genre: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  });
  return books;
};

export const searchByTag = async (keyword) => {
  const tagsListToString = Sequelize.fn('lower', Sequelize.fn('array_to_string', Sequelize.col('tagsList'), '|'));
  const books = await db.Books.findAll({ where: Sequelize.where(tagsListToString, { [Op.iLike]: `%${keyword.toLowerCase()}%` }) });
  return books;
};
