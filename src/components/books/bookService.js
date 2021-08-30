/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import * as Book from './bookDAL';
import { getPagination, getPagingData } from '../../utils/pagination';

/**
   * @description service for getting paginated featured book
   * @method getFeaturedBooks
   *
   * @param {number} page
   * @param {number} size
   *
   * @returns {Object}
   */
export const getFeaturedBooksService = async (page, size) => {
  const { limit, offset } = getPagination(page, size);
  const featuredBooks = await Book.getFeaturedBooks({ limit, offset });
  const resultWithTotalCount = getPagingData(featuredBooks, page, limit);
  return resultWithTotalCount;
};

/**
   * @description service for getting single book details
   * @method getSingleBookDetailService
   *
   * @param {string} slug
   *
   * @returns {Object}
   */
export const getSingleBookDetailService = async (slug) => {
  const bookDetail = await Book.getSingleBook(slug);
  return bookDetail;
};

/**
   * @description service for updating book like Count
   * @method updateBookLikeCount
   *
   * @param {string} slug
   * @param {number} count
   * 
   * @returns {Object}
   */
export const updateBookLikeCount = async (slug, count) => {
  const result = await Book.updateBookLike(slug, count);
  return result;
};

/**
   * @description service for performing custom search
   * @method customSearchBooksService
   *
   * @param {string} keyword
   * @param {string} filter
   * @param {number} page
   * @param {number} size
   *
   * @returns {Object}
   */
export const customSearchBooksService = async (keyword, filter, page, size) => {
  const { limit, offset } = getPagination(page, size, true);
  const searchResults = await Book.searchBookByFilter(keyword, filter, limit, offset);
  const results = getPagingData(searchResults, page, limit);
  return results.books;
};
