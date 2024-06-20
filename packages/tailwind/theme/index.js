// @ts-check

import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography.js';
import { colors } from './colors.js';
import { maxWidth, screens } from './layout.js';

/**
 * See original config:
 * file://./../node_modules/tailwindcss/stubs/config.full.js
 */

// eslint-disable-next-line import/no-default-export
export default {
    extend: {},

    maxWidth,
    colors,

    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,

    screens,
};
