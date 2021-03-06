import { getCartItem, addCartItem } from './cartService';
import Response from '../../libraries/response';

/**
   * @description controller for getting cartItem
   * @method getUserCartItem
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
export const getUserCartItem = async (req, res, next) => {
  try {
    const data = await getCartItem(req);
    return Response.successResponse(
      res,
      data.subTotal ? 'cart item fetched successfully!' : 'Cart is Empty!',
      data,
    );
  } catch (error) {
    return next(error);
  }
};

/**
   * @description controller for addingItem to cart
   * @method addCartItem
   *
   * @param {Object} req
   * @param {Object} res
   * @param {@function} next
   *
   * @returns {Object}
   */
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
