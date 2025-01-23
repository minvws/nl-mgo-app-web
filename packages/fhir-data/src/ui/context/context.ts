import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { type MgoResource } from '../../api/resources/resources';
import { Locale, createI18nContext, type IntlOptions } from '../../i18n';
import { getUi, type Ui, type UiHelperContext } from './ui';

export interface UiSchemaOptions<V extends `${FhirVersion}`> {
    locale?: Locale;
    resources?: MgoResource<V>[];
}

export type UiSchemaContext<V extends `${FhirVersion}` = FhirVersion> = UiHelperContext & {
    ui: Ui;
    resources: MgoResource<V>[];
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
