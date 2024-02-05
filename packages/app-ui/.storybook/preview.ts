import type { Preview } from '@storybook/react';
import '@minvws/pgo-tailwind/fonts.css';
import '@minvws/pgo-tailwind/index.css';

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
    },
};

export default preview;
