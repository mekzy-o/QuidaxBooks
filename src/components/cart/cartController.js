/* eslint-disable import/prefer-default-export */
import { getCartItem, addCartItem } from './cartService';
import Response from '../../libraries/response';

export const getUserCartItem = async (req, res, next) => {
  try {
    const data = await getCartItem(req);
    return Response.successResponse(
      res,
      'cart item fetched successfully!',
      data,
    );
  } catch (error) {
    return next(error);
  }
};

export const addToCartItem = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await addCartItem(req, slug);
    return Response.successResponse(
      res,
      'cart item added successfully!',
      data,
    );
  } catch (error) {
    return next(error);
  }
};
