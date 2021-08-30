/* eslint-disable import/prefer-default-export */
import { bookServices } from '../index';
import Response from '../../libraries/response';
import { addRating, getBookRating, getUserRating } from './rateDAL';
import { roundToOneDecimal } from '../../utils/roundToOneDecimal';

/**
   * @description service for rating books
   * @method rateBook
   *
   * @param {Object} req
   * @param {string} rate
   * @param {string} next
   *
   * @returns {Object}
   */
export const rateBook = async (req, rate, slug) => {
  const user = req.session.userId;
  const checkBook = await bookServices.getSingleBookDetailService(slug);
  if (!checkBook.length) {
    throw Response.applicationError('Book you want to rate does not exist');
  }
  const checkUser = await getUserRating(user, slug);
  if (checkUser.length) {
    throw Response.applicationError('You already rated this book');
  }
  const data = {
    userId: user, bookSlug: slug, ratings: rate,
  };
  await addRating(data);
  const bookratings = await getBookRating(slug);
  const averageRatings = roundToOneDecimal((bookratings
    .reduce((acc, current) => Number(current.ratings)
    + acc, 0) / bookratings.length));
  return { averageRatings, bookDetails: checkBook[0] };
};
