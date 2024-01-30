const path = require('path');
const theme = require('./tailwind/theme/index.cjs');

module.exports = {
    content: [
        path.resolve(__dirname, './**/*.(ts|tsx)'),
        path.resolve(__dirname, '../docs/**/*.(ts|tsx)'),
    ],
    theme,
};
