import Response from '../../libraries/response';
import { getFeaturedBooksService, getSingleBookDetailService, customSearchBooksService } from './bookService';

/**
   * @description controller for getting featured books
   * @method getFeaturedBooks
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const getFeaturedBooks = async (req, res, next) => {
  const { page, size } = req.query;
  try {
    const data = await getFeaturedBooksService(page, size);
    return Response.successResponse(
      res,
      'Featured Books fetched successfully',
      data,
    );
  } catch (error) {
    return next(error);
  }
};

/**
   * @description controller for getting single book
   * @method getSingleBookDetail
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@Object} next
   *
   * @returns {@function}
   */
export const getSingleBookDetail = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const data = await getSingleBookDetailService(slug);
    return Response.successResponse(
      res,
      'Book detail fetched successfully',
      data,
    );
  } catch (error) {
    return next(error);
  }
};

/**
   * @description controller for searching for books
   * @method searchBooks
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const searchBooks = async (req, res, next) => {
  const {
    query, filter, page, size,
  } = req.query;
  try {
    const data = await customSearchBooksService(query, filter, page, size);
    return Response.successResponse(
      res,
      'Books fetched successfully',
      !data.length ? 'No search result found' : data,
    );
  } catch (error) {
    return next(error);
  }
};
