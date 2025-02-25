import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { type HealthUiSchemaOptions } from '../../../api/getDetails/getDetails';
import { type MgoResource } from '../../../api/resources/resources';
import {
    createUiHelperContext,
    type UiHelperContext,
    type UiHelperContextOptions,
} from '../helper/helper';
import { getUi, type Ui } from './ui';

export type SchemaContextOptions<T extends `${FhirVersion}`> = HealthUiSchemaOptions<T> &
    UiHelperContextOptions;

export type HealthUiSchemaContext<V extends `${FhirVersion}` = FhirVersion> = UiHelperContext & {
    ui: Ui;
    resources: MgoResource<V>[];
};

export function createSchemaContext<V extends `${FhirVersion}`>(
    options: SchemaContextOptions<V>
): HealthUiSchemaContext<V> {
    const { resources = [], locale, ignoreMissingTranslations, isSummary } = options;

    const uiHelperContext = createUiHelperContext({ locale, ignoreMissingTranslations, isSummary });

    return {
        ...uiHelperContext,
        ui: getUi(uiHelperContext),
        resources,
        isSummary,
    };
}
