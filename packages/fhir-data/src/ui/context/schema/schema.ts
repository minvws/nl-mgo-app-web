import { type FhirVersion } from '@minvws/mgo-fhir-types';
import {
    type HealthUiSchemaOptions,
    type HealthUiSchemaOrganization,
} from '../../../api/getDetails/getDetails';
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
    organization: HealthUiSchemaOrganization | undefined;
};

export function createSchemaContext<V extends `${FhirVersion}`>(
    options: SchemaContextOptions<V>
): HealthUiSchemaContext<V> {
    const {
        resources = [],
        organization = undefined,
        locale,
        ignoreMissingTranslations,
        isSummary,
    } = options;

    const uiHelperContext = createUiHelperContext({ locale, ignoreMissingTranslations, isSummary });

    return {
        ...uiHelperContext,
        ui: getUi(uiHelperContext),
        resources,
        organization,
        isSummary,
    };
}
