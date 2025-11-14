import { appConfig } from '$/config';
import { Locale, getAppIntlConfig } from '@minvws/mgo-intl';
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
            // eslint-disable-next-line react/no-unstable-nested-components
            b: (chunks) => <b className="font-bold">{chunks}</b>, // NOSONAR
            // eslint-disable-next-line react/no-unstable-nested-components
            i: (chunks) => <i className="italic">{chunks}</i>, // NOSONAR
        },
        /* c8 ignore end */
        ignoreMissingTranslations: appConfig.ignore_missing_translations,
    });

    return <ReactIntlProvider {...intlConfig}>{children}</ReactIntlProvider>;
};
