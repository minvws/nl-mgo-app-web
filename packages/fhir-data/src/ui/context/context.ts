import { type MgoResourceR3, type MgoResourceR4 } from '../../api/resources/resources';
import { Locale, createI18nContext, type IntlOptions } from '../../i18n';
import { type FhirR3R4, type FhirVersion } from '../../types/Fhir';
import { getUi, type Ui, type UiHelperContext } from './ui';

export interface UiSchemaOptions<T extends `${FhirVersion}`> {
    locale?: Locale;
    resources?: FhirR3R4<T, MgoResourceR3[], MgoResourceR4[]>;
}

export type UiSchemaContext<T extends `${FhirVersion}` = FhirVersion> = UiHelperContext & {
    ui: Ui;
    resources: FhirR3R4<T, MgoResourceR3[], MgoResourceR4[]>;
};

export type UiSchemaContextOptions<T extends `${FhirVersion}`> = UiSchemaOptions<T> &
    Omit<IntlOptions, 'locale'> & {
        isSummary?: boolean;
    };

export function createUiSchemaContext<T extends `${FhirVersion}`>(
    options: UiSchemaContextOptions<T>
): UiSchemaContext<T> {
    const { locale, ignoreMissingTranslations, ignoreIntlCache, resources, isSummary } = options;

    const uiHelperContext: UiHelperContext = {
        ...createI18nContext({
            locale: locale ?? Locale.NL_NL,
            ignoreMissingTranslations,
            ignoreIntlCache,
        }),
        isSummary,
    };

    return {
        ...uiHelperContext,
        ui: getUi(uiHelperContext),
        resources: resources ?? [],
    } as UiSchemaContext<T>;
}
