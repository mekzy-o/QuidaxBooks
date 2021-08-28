/* eslint-disable import/prefer-default-export */
export const roundToOneDecimal = (num) => +(`${Math.round(`${num}e+1`)}e-1`);
