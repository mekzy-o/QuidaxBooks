/* eslint-disable import/prefer-default-export */
import Response from '../../libraries/response';
import { rateBook, getBookAverageRating } from './rateServices';

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
