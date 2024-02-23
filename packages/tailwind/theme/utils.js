// @ts-check

/**
 * @param {number} px
 * @returns {string} rem equivalent to px
 */
export const pxToRem = (px) => `${Math.round((px / 16) * 100) / 100}rem`;
