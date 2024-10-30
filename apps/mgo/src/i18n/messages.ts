import { type MessageFormatElement } from 'react-intl';
import commonMessages from './locales/compiled/nl/common.json';
import healthCategoryMessages from './locales/compiled/nl/health_category.json';
import appMessages from './locales/compiled/nl/views.json';

export const messagesNL = {
    ...healthCategoryMessages,
    ...commonMessages,
    ...appMessages,
};

export type MessagesIds = keyof typeof messagesNL;
export type Messages = Record<MessagesIds, MessageFormatElement[]>;

/** This enables strict type checks on message id's */
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: MessagesIds;
        }
    }
}
