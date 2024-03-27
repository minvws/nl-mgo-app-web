import { pxToRem } from './utils.js';

export const fontFamily = {
    sans: ['RO Sans Web', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
};

export const fontSize = {
    sm: pxToRem(14),
    md: pxToRem(16),
    lg: pxToRem(18),
    xl: pxToRem(20),
    '2xl': pxToRem(24),
    '3xl': pxToRem(32),
    '4xl': pxToRem(48),
    '5xl': pxToRem(64),
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
