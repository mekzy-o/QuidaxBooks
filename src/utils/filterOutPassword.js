/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

/**
  * @function filterPassword
  * @description filters out password from user object
  * @param {*} data represent user details
  * @returns {object} user object
  */
export const filterOutPassword = (data) => {
  let userData = data.dataValues;
  const filterOutKeys = ['password'];
  if (!Array.isArray(data)) userData = [data.dataValues];
  const filteredData = userData.map((singleData) => Object.keys(singleData)
    .reduce((object, key) => {
      if (!filterOutKeys.includes(key)) object[key] = singleData[key];
      return object;
    }, {}));
  return (filteredData.length === 1 && !Array.isArray(data)) ? filteredData[0] : filteredData;
};
