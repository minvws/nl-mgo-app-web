// @ts-check
import { pxToRem, pxToEm } from './utils.js';

export const maxWidth = {
    xs: pxToRem(433), // 4 columns
    sm: pxToRem(546), // 5 columns
    md: pxToRem(660), // 6 columns
    lg: pxToRem(1116), // 10 columns
    xl: pxToRem(1392), // 12 columns
    none: 'none',
    full: '100%',
    prose: '65ch',
};

/**
 * We use `em` breakpoints for better a11y support
 * This will most likely be de default soon for tailwind as well
 * @see https://github.com/tailwindlabs/tailwindcss/discussions/8378
 */
export const screens = {
    sm: pxToEm(640),
    md: pxToEm(768),
    lg: pxToEm(1024),
    xl: pxToEm(1280),
    '2xl': pxToEm(1536),
};
