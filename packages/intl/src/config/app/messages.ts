import commonMessages from '../../../src/locales/app/compiled/nl/common.json' with { type: 'json' };
import healthCategoryMessages from '../../../src/locales/app/compiled/nl/health_category.json' with { type: 'json' };
import appMessages from '../../../src/locales/app/compiled/nl/views.json' with { type: 'json' };

export const appMessagesNL = {
    ...healthCategoryMessages,
    ...commonMessages,
    ...appMessages,
};

export type AppMessagesIds = keyof typeof appMessagesNL;
