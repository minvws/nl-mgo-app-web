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
import { createLabelFormatter } from './formatLabel.js';

export type UiContextOptions = {
    isSummary?: boolean;
    ignoreMissingTranslations?: boolean;
    locale: Locale;
};

const intlCache = createIntlCache();

export type UiContext = {
    isSummary: boolean | undefined;
    intl: FhirIntlShape;
    formatLabel: ReturnType<typeof createLabelFormatter>;
} & IntlHelpers<string, FhirMessagesIds>;

export function createUiContext(options: UiContextOptions): UiContext {
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
