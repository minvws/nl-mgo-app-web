import {
    createHelpers,
    createIntl,
    createIntlCache,
    getFhirIntlConfig,
    type FhirIntlOptions,
    type FhirIntlShape,
} from '@minvws/mgo-mgo-intl';

export type UiHelperContextOptions = Pick<
    FhirIntlOptions<string>,
    'ignoreMissingTranslations' | 'locale'
> & {
    isSummary?: boolean;
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
    };
}

export type UiHelperContext = ReturnType<typeof createUiHelperContext>;
