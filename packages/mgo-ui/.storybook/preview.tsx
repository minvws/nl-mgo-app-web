import type { Preview } from '@storybook/react';
import '@minvws/mgo-tailwind/fonts.css';
import '@minvws/mgo-tailwind/index.css';
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
};

export default preview;
