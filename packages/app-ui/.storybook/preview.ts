import type { Preview } from '@storybook/react';
import '@minvws/pgo-tailwind/fonts.css';
import '@minvws/pgo-tailwind/index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
