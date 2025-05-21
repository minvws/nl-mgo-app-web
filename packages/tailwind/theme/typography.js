import { pxToRem } from './utils.js';

export const fontFamily = {
    sans: ['RO Sans Web', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
};

export const fontSize = {
    xs: pxToRem(15),
    sm: pxToRem(17),
    md: pxToRem(18),
    lg: pxToRem(20),
    xl: pxToRem(24),
    '2xl': pxToRem(28),
    '3xl': pxToRem(34),
    '4xl': pxToRem(46),
};

export const lineHeight = {
    none: '1',
    tight: '1.2',
    normal: '1.5',
};

export const letterSpacing = {
    normal: '0.01em',
};

export const fontWeight = {
    normal: 'normal',
    bold: 'bold',
};
