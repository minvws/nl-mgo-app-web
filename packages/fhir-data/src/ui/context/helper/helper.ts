import {
    createHelpers,
    createIntl,
    createIntlCache,
    FhirMessagesIds,
    getFhirIntlConfig,
    IntlHelpers,
    type FhirIntlShape,
    type Locale,
} from '@minvws/mgo-intl';
import { createLabelFormatter } from './formatLabel';

export type UiHelperContextOptions = {
    isSummary?: boolean;
    ignoreMissingTranslations?: boolean;
    locale: Locale;
};

const intlCache = createIntlCache();

export type UiHelperContext = {
    isSummary: boolean | undefined;
    intl: FhirIntlShape;
    formatLabel: ReturnType<typeof createLabelFormatter>;
} & IntlHelpers<string, FhirMessagesIds>;

export function createUiHelperContext(options: UiHelperContextOptions): UiHelperContext {
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
