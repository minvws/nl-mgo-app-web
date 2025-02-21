import { Locale, getAppIntlConfig } from '@minvws/mgo-mgo-intl';
import { type ReactNode } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';

interface I18nProviderProps {
    readonly children: ReactNode;
}

export const IntlProvider = ({ children }: I18nProviderProps) => {
    const config = getAppIntlConfig<ReactNode>({
        locale: Locale.NL_NL,
        /* c8 ignore start */
        defaultRichTextElements: {
            b: (chunks) => <b className="font-bold">{chunks}</b>, // NOSONAR
            i: (chunks) => <i className="italic">{chunks}</i>, // NOSONAR
        },
        ignoreMissingTranslations: true,
        /* c8 ignore end */
    });

    return <ReactIntlProvider {...config}>{children}</ReactIntlProvider>;
};
