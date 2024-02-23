// @ts-check
import { pxToRem } from './utils.js';

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

export const screens = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};
