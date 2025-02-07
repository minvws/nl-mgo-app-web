import { createIntl as createFormatJsIntl, createIntlCache, type IntlShape } from '@formatjs/intl';
import { messagesNL, type Locale } from '../messages';

const intlCache: Partial<Record<Locale, IntlShape>> = {};

export interface IntlOptions {
    locale: Locale;
    ignoreMissingTranslations?: boolean;
    ignoreIntlCache?: boolean;
}

export function createIntl(options: IntlOptions): IntlShape {
    const { locale, ignoreMissingTranslations, ignoreIntlCache } = options;
    let intl = ignoreIntlCache ? undefined : intlCache[locale];

    /* c8 ignore start */
    const onError = (error: Error) => {
        const environment = typeof process !== 'undefined' ? process.env.NODE_ENV : 'production';
        if (environment !== 'test' && environment !== 'development') {
            return;
        }

        if (
            ignoreMissingTranslations &&
            typeof error.message === 'string' &&
            error.message.includes('[@formatjs/intl Error MISSING_TRANSLATION]')
        ) {
            return;
        }

        throw error;
    };
    /* c8 ignore end */

    if (!intl) {
        const cache = createIntlCache();
        intl = createFormatJsIntl(
            {
                locale,
                /**
                 * Currently only Dutch is supported
                 * We need to figure out how we want to deal with possibly async loading of other languages
                 * Especially in the context of the mobile applications
                 */
                messages: messagesNL,
                onError,
            },
            cache
        );
        intlCache[locale] = intl;
    }

    return intl;
}
