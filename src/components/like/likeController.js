/* eslint-disable import/prefer-default-export */
import Response from '../../libraries/response';
import { likeOrUnlikeBookService } from './likeServices';

/**
   * @description controller for liking and unliking a book
   * @method addorRemoveLike
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const addorRemoveLike = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { result, liked } = await likeOrUnlikeBookService(req, slug);
    const {
      title, description, author, likeCount,
    } = result[1][0].dataValues;
    return Response.successResponse(
      res,
      !liked ? "You've unliked this book successfully" : "You've liked this book successfully",
      {
        title, description, author, likeCount,
      },
    );
  } catch (error) {
    return next(error);
  }
};
