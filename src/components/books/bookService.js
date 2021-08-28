/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import * as Book from './bookDAL';
import { getPagination, getPagingData } from '../../utils/pagination';

export const getFeaturedBooksService = async (page, size) => {
  const { limit, offset } = getPagination(page, size);
  const featuredBooks = await Book.getFeaturedBooks({ limit, offset });
  const resultWithTotalCount = getPagingData(featuredBooks, page, limit);
  return resultWithTotalCount;
};

export const getSingleBookDetailService = async (id) => {
  const bookDetail = await Book.getSingleBook(id);
  return bookDetail;
};

export const customSearchBooksService = async (keyword, filter) => {
  const searchedBooksByAuthor = await Book.searchBookByAuthor(keyword);
  const searchedBookByTitle = await Book.searchBookByTitle(keyword);
  const searchBookByTag = await Book.searchByTag(keyword);
  const searchBookByGenre = await Book.searchByTag(keyword);
  let searchResult;
  switch (filter) {
    case 'title':
      searchResult = searchedBookByTitle;
      break;
    case 'author':
      searchResult = searchedBooksByAuthor;
      break;
    case 'tags':
      searchResult = searchBookByTag;
      break;
    case 'genre':
      searchResult = searchBookByGenre;
      break;
    default:
      searchResult = [];
  }
  return searchResult;
};
