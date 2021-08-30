/* eslint-disable import/prefer-default-export */
import { bookServices } from '../index';
import Response from '../../libraries/response';
import { getUserLike, removeUserLike, createLike } from './likeDAL';

/**
   * @description service for liking and unliking a book
   * @method likeOrUnlikeBookService
   *
   * @param {Object} req
   * @param {string} slug
   *
   * @returns {Object}
   */
export const likeOrUnlikeBookService = async (req, slug) => {
  const user = req.session.userId;
  const checkBook = await bookServices.getSingleBookDetailService(slug);
  if (!checkBook.length) {
    throw Response.applicationError('Book you want to like does not exist');
  }
  const checkUserLiked = await getUserLike(user, slug);
  if (checkUserLiked.length) {
    await removeUserLike(user, slug);
    const result = await bookServices.updateBookLikeCount(slug, -1);
    return { result, liked: false };
  }
  const data = {
    userId: user, bookSlug: slug, like: true,
  };
  await createLike(data);
  const result = await bookServices.updateBookLikeCount(slug, +1);
  return { result, liked: true };
};
