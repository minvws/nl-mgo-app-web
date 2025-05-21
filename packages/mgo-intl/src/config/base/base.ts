import { type IntlConfig as FormatIntlConfig, type OnErrorFn } from '@formatjs/intl';
import { type Locale } from '../../locale';

export interface IntlOptions<RichTextElement> extends FormatIntlConfig<RichTextElement> {
    locale: Locale;
    ignoreMissingTranslations?: boolean;
}

export function getIntlConfig<RichTextElement>(options: IntlOptions<RichTextElement>) {
    const { ignoreMissingTranslations, onError, ...rest } = options;

    const handleError: OnErrorFn = (error) => {
        if (
            ignoreMissingTranslations &&
            typeof error.message === 'string' &&
            error.message.includes('[@formatjs/intl Error MISSING_TRANSLATION]')
        ) {
            return;
        }

        if (typeof onError === 'function') {
            onError(error);
            return;
        }

        throw error;
    };

    return {
        onError: handleError,
        ...rest,
    };
}
