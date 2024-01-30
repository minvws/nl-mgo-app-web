const path = require('path');
const theme = require('@pgo/app-ui/tailwind/theme');

const config = {
    theme,
    darkMode: 'media',
    content: [
        './node_modules/@pgo/app-ui/**/*.{ts,tsx}',
        path.resolve(__dirname, './src/**/*.{ts,tsx}'),
    ],
};

module.exports = config;
