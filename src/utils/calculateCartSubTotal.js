/* eslint-disable import/prefer-default-export */
export const calculateSubTotal = (cart) => {
  let subtotal = 0;
  Object.entries(cart).forEach(([key, value]) => {
    subtotal += Number(value.total);
  });
  return subtotal;
};
