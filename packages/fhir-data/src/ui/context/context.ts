import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { type HealthUiSchemaOptions } from '../../api/getDetails/getDetails';
import { type MgoResource } from '../../api/resources/resources';
import { createI18nContext, type IntlOptions } from '../../i18n';
import { getUi, type Ui, type UiHelperContext } from './ui';

export type HealthUiSchemaContext<V extends `${FhirVersion}` = FhirVersion> = UiHelperContext & {
    ui: Ui;
    resources: MgoResource<V>[];
};

export type SchemaContextOptions<T extends `${FhirVersion}`> = HealthUiSchemaOptions<T> &
    IntlOptions & {
        isSummary?: boolean;
    };

export function createSchemaContext<T extends `${FhirVersion}`>(
    options: SchemaContextOptions<T>
): HealthUiSchemaContext<T> {
    const { locale, ignoreMissingTranslations, ignoreIntlCache, resources, isSummary } = options;

    const uiHelperContext: UiHelperContext = {
        ...createI18nContext({
            locale,
            ignoreMissingTranslations,
            ignoreIntlCache,
        }),
        isSummary,
    };

    return {
        ...uiHelperContext,
        ui: getUi(uiHelperContext),
        resources: resources ?? [],
    } as HealthUiSchemaContext<T>;
}
