import { type ReactNode } from 'react';
import { IntlProvider, type MessageFormatElement, type IntlConfig } from 'react-intl';
import messagesNL from './locales/nl.json';

export type MessagesIds = keyof typeof messagesNL;
export type Messages = Record<MessagesIds, MessageFormatElement[]>;

const locale = 'nl';
const messages: Messages = messagesNL;

interface I18nProviderProps {
    readonly children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
    const config: IntlConfig = {
        locale,
        messages,
        /* c8 ignore start, text elements may not be used in the actual copy */
        defaultRichTextElements: {
            b: (chunks) => <b className="font-bold">{chunks}</b>,
            i: (chunks) => <i className="italic">{chunks}</i>,
        },
        /* c8 ignore end */
    };

    return <IntlProvider {...config}>{children}</IntlProvider>;
};
