import { type FhirVersion } from '@minvws/mgo-fhir';
import {
    type UiContext,
    type UiContextOptions,
    type UiHelpers,
    createUiContext,
    createUiHelpers,
} from '@minvws/mgo-hcim-ui';
import { type MgoResource } from '../resources/resources.js';

export type SchemaOptions<V extends `${FhirVersion}`> = UiContextOptions & {
    resources?: MgoResource<V>[];
    organization?: {
        name?: string;
    };
};

export type SchemaPartialContext = UiContext & {
    ui: UiHelpers;
};

export type SchemaContext<V extends `${FhirVersion}` = FhirVersion> = SchemaPartialContext & {
    ui: UiHelpers;
    resources: MgoResource<V>[];
    organization?: {
        name?: string;
    };
};

export function createSchemaContext<V extends `${FhirVersion}`>(
    options: SchemaOptions<V>
): SchemaContext<V> {
    const {
        resources = [],
        organization = undefined,
        locale,
        ignoreMissingTranslations,
        isSummary,
    } = options;

    const uiContext = createUiContext({ locale, ignoreMissingTranslations, isSummary });
    const uiHelpers = createUiHelpers(uiContext);

    return {
        ...uiContext,
        ui: uiHelpers,
        resources,
        organization,
        isSummary,
    };
}
