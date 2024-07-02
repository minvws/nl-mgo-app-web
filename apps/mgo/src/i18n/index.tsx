import { type ReactNode } from 'react';
import { IntlProvider, type IntlConfig } from 'react-intl';
import messagesNL from './locales/nl.json';

interface I18nProviderProps {
    readonly children: ReactNode;
    readonly locale: 'nl';
}

const config: Partial<IntlConfig> = {
    defaultLocale: 'nl',
    messages: messagesNL,
    /* c8 ignore start, text elements may not be used in the actual copy */
    defaultRichTextElements: {
        b: (chunks) => <b className="font-bold">{chunks}</b>,
        i: (chunks) => <i className="italic">{chunks}</i>,
    },
    /* c8 ignore end */
};

export const I18nProvider = ({ children, locale }: I18nProviderProps) => (
    <IntlProvider locale={locale} {...config}>
        {children}
    </IntlProvider>
);

// Configure message ids for type safety
// @see: https://formatjs.io/docs/react-intl/#typing-message-ids-and-locale
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof messagesNL;
        }
    }
}
