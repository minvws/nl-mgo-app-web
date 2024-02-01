/* c8 ignore start */

import theme from '@minvws/pgo-tailwind/theme/index.js';

export const singleColors = Object.entries(theme.colors)
    .filter(([, colors]) => typeof colors === 'string')
    .map(([name, color]) => [name, { [name]: color }]);

export const colorSwatches = Object.entries(theme.colors).filter(
    ([, colors]) => typeof colors !== 'string'
);
