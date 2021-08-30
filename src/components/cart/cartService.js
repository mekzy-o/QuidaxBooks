import { bookServices } from '../index';
import Response from '../../libraries/response';
import { calculateSubTotal } from '../../utils/calculateCartSubTotal';

/**
   * @description service for getting all cart items with subtotal
   * @method getCartItem
   *
   * @param {Object} req
   *
   * @returns {Object}
   */
export const getCartItem = async (req) => {
  const { userId } = req.session;
  const cartItems = req.session.cart[userId];
  if (!cartItems) {
    return {};
  }
  const subTotal = calculateSubTotal(cartItems);
  return { ...cartItems, subTotal };
};

/**
   * @description service for adding cart items
   * @method addCartItem
   *
   * @param {Object} req
   * @param {Object} slug
   *
   * @returns {Object}
   */
export const addCartItem = async (req, slug) => {
  const book = await bookServices.getSingleBookDetailService(slug);
  if (!book.length) {
    throw Response.applicationError('Book not found');
  }
  const {
    title, imgUrl, amount, quantity_available: quantityAvailable,
  } = book[0].dataValues;
  const { userId } = req.session;
  const getUserCartObject = req.session.cart[userId];
  if (quantityAvailable <= 0) {
    throw Response.applicationError('Book is not available at the moment');
  }
  if (!getUserCartObject) {
    req.session.cart = {
      ...req.session.cart,
      [userId]: {
        [slug]: {
          title, price: amount, thumbnail: imgUrl, count: 1, total: `${amount}`,
        },
      },
    };
    return req.session.cart[userId];
  }
  if (!getUserCartObject[slug]) {
    req.session.cart[userId] = {
      ...req.session.cart[userId],
      [slug]: {
        title, price: amount, thumbnail: imgUrl, count: 1, total: `${amount}`,
      },
    };
    return req.session.cart[userId];
  }
  getUserCartObject[slug].count++;
  getUserCartObject[slug].total = amount * getUserCartObject[slug].count;
  return getUserCartObject;
};
