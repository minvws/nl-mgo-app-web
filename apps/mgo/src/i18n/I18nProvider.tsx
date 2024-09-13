import { type ReactNode } from 'react';
import { IntlProvider, type MessageFormatElement, type IntlConfig } from 'react-intl';
import appMessages from './locales/compiled/nl/app.json';
import zibMedicationUse from './locales/compiled/nl/zib_medication_use.json';

const messagesNL = {
    ...appMessages,
    ...zibMedicationUse,
};

export type MessagesIds = keyof typeof messagesNL;
export type Messages = Record<MessagesIds, MessageFormatElement[]>;

const locale = 'nl';
const messages: Messages = messagesNL;

interface I18nProviderProps {
    readonly children: ReactNode;
}

const ignoreDefaulMessageError = (error: Error) => {
    if (
        typeof error.message === 'string' &&
        error.message.includes('[@formatjs/intl Error MISSING_TRANSLATION]')
    ) {
        return;
    }
};

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
        onError: ignoreDefaulMessageError,
    };

    return <IntlProvider {...config}>{children}</IntlProvider>;
};
