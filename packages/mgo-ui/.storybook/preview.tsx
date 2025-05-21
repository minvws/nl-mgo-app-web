import type { Preview } from '@storybook/react';

import './style.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                order: ['Docs', ['Introduction'], ['Default']],
            },
        },
        backgrounds: {
            disable: true,
        },
    },

    tags: ['autodocs'],
};

export default preview;
