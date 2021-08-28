/* eslint-disable import/prefer-default-export */
import { bookServices } from '../index';
import Response from '../../libraries/response';
import { addRating, getBookRating, getUserRating } from './rateDAL';
import { roundToOneDecimal } from '../../utils/roundToOneDecimal';

export const rateBook = async (req, rate, slug) => {
  const user = req.session.userId;
  const checkBook = await bookServices.getSingleBookDetailService(slug);
  if (!checkBook.length) {
    throw Response.applicationError('Book you want to rate does not exist');
  }
  const checkUser = await getUserRating(user);
  if (checkUser.length) {
    throw Response.applicationError('You already rated this book');
  }
  const data = {
    userId: user, bookSlug: slug, ratings: rate,
  };
  const result = await addRating(data);
  return result;
};

export const getBookAverageRating = async (slug) => {
  const checkBook = await bookServices.getSingleBookDetailService(slug);
  if (!checkBook.length) {
    throw Response.applicationError('Book you want does not exist');
  }
  const bookratings = await getBookRating(slug);
  const averageRatings = roundToOneDecimal((bookratings
    .reduce((acc, current) => Number(current.ratings)
    + acc, 0) / bookratings.length));
  return { averageRatings, bookDetails: checkBook[0] };
};
