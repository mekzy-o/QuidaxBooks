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

export const getSingleBookDetailService = async (slug) => {
  const bookDetail = await Book.getSingleBook(slug);
  return bookDetail;
};
export const updateBookLikeCount = async (slug, count) => {
  const result = await Book.updateBookLike(slug, count);
  return result;
};

export const customSearchBooksService = async (keyword, filter, page, size) => {
  const { limit, offset } = getPagination(page, size, true);
  const searchResults = await Book.searchBookByFilter(keyword, filter, limit, offset);
  const results = getPagingData(searchResults, page, limit);
  return results.books;
};
