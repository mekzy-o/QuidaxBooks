/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export

/**
  * @function getPagination
  * @description util function that returns data with specified page and size
  * @param {*} page page number
  * @param {*} size page size
  * @returns {object} pagination object containing limit and offset
  */
export const getPagination = (page, size, searchField = false) => {
  const limit = size ? +size : +searchField ? 10 : 15;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

/**
  * @function getPagination
  * @description util function that returns paginated data with total count of items, currentPage
  * @param {*} data paginated data
  * @param {*} page page number
  * @param {*} limit limit of data
  * @returns {object} paginated data with current page and totalItems
  */
export const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: books } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems, books, totalPages, currentPage,
  };
};
