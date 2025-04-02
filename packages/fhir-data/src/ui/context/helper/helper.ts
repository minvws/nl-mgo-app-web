import {
    createHelpers,
    createIntl,
    createIntlCache,
    getFhirIntlConfig,
    type FhirIntlShape,
    type Locale,
} from '@minvws/mgo-mgo-intl';
import { createLabelFormatter } from './formatLabel';

export type UiHelperContextOptions = {
    isSummary?: boolean;
    ignoreMissingTranslations?: boolean;
    locale: Locale;
};

const intlCache = createIntlCache();

export function createUiHelperContext(options: UiHelperContextOptions) {
    const { locale, ignoreMissingTranslations, isSummary } = options;

    const intl = createIntl(
        getFhirIntlConfig({
            locale,
            ignoreMissingTranslations,
        }),
        intlCache
    ) as FhirIntlShape;

    return {
        isSummary,
        intl,
        ...createHelpers(intl),
        formatLabel: createLabelFormatter(intl),
    };
}

export type UiHelperContext = ReturnType<typeof createUiHelperContext>;
