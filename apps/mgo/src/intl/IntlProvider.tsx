import { config } from '$/config';
import { Locale, getAppIntlConfig } from '@minvws/mgo-mgo-intl';
import { type ReactNode } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';

interface I18nProviderProps {
    readonly children: ReactNode;
}

export const IntlProvider = ({ children }: I18nProviderProps) => {
    const intlConfig = getAppIntlConfig<ReactNode>({
        locale: Locale.NL_NL,
        /* c8 ignore start */
        defaultRichTextElements: {
            b: (chunks) => <b className="font-bold">{chunks}</b>, // NOSONAR
            i: (chunks) => <i className="italic">{chunks}</i>, // NOSONAR
        },
        /* c8 ignore end */
        ignoreMissingTranslations: config.ignore_missing_translations,
    });

    return <ReactIntlProvider {...intlConfig}>{children}</ReactIntlProvider>;
};
