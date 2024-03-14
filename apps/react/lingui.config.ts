import { fileURLToPath, URL } from 'url';
import type { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-po';

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config: LinguiConfig = {
    locales: ['nl'],
    sourceLocale: 'nl',
    orderBy: 'messageId',
    format: formatter({
        explicitIdAsDefault: true,
    }),
    rootDir: resolve('.'),
    catalogs: [
        {
            path: '<rootDir>/src/i18n/locales/{locale}',
            include: ['src'],
        },
    ],
};

export default config; // eslint-disable-line import/no-default-export
