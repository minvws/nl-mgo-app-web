import commonMessages from '../../../locales/app/compiled/nl/common.json';
import healthCategoryMessages from '../../../locales/app/compiled/nl/health_category.json';
import appMessages from '../../../locales/app/compiled/nl/views.json';

export const appMessagesNL = {
    ...healthCategoryMessages,
    ...commonMessages,
    ...appMessages,
};

export type AppMessagesIds = keyof typeof appMessagesNL;
