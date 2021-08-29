import Response from '../../libraries/response';
import { getFeaturedBooksService, getSingleBookDetailService, customSearchBooksService } from './bookService';

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
