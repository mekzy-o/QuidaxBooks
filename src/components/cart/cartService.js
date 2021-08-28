/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { bookServices } from '../index';
import Response from '../../libraries/response';
import { calculateSubTotal } from '../../utils/calculateCartSubTotal';

export const getCartItem = async (req) => {
  const { userId } = req.session;
  const cartItems = req.session.cart[userId];
  const subTotal = calculateSubTotal(cartItems);
  return { ...cartItems, subTotal };
};

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
