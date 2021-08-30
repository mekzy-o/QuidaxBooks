/* eslint-disable import/prefer-default-export */
import Response from '../../libraries/response';
import { rateBook } from './rateServices';

/**
   * @description controller for rating a book
   * @method addRating
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const addRating = async (req, res, next) => {
  try {
    const { rate } = req.body;
    const { slug } = req.params;
    const data = await rateBook(req, rate, slug);
    return Response.successResponse(
      res,
      "You've rated this book successfully",
      data,
    );
  } catch (error) {
    return next(error);
  }
};

/**
   * @description controller for getting average rating of a book
   * @method getAverageRating
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const getAverageRating = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await getBookAverageRating(slug);
    return Response.successResponse(
      res,
      'Average ratings fetched successfully',
      data,
    );
  } catch (error) {
    return next(error);
  }
};
