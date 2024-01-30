import theme from '@pgo/tailwind/theme/index.js';

export const singleColors = Object.entries(theme.colors)
    .filter(([name, colors]) => typeof colors === 'string')
    .map(([name, color]) => [name, { [name]: color }]);

export const colorSwatches = Object.entries(theme.colors).filter(
    ([name, colors]) => typeof colors !== 'string'
);
