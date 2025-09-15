import theme from '@minvws/mgo-tailwind/theme/index.js';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'path';

export default {
    theme,
    content: [
        'index.html',
        join(__dirname, 'src/**/*!(*.test).{ts,tsx}'),
        join(__dirname, 'index.html'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
};
