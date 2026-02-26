import { type FhirVersion } from '@minvws/mgo-fhir';
import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import {
    type UiContext,
    type UiContextOptions,
    type UiHelpers,
    createUiContext,
    createUiHelpers,
} from '@minvws/mgo-hcim-ui';

export type SchemaOptions<_V extends FhirVersion> = UiContextOptions & {
    resources?: MgoResourceMeta[];
    organization?: {
        name?: string;
    };
};

export type SchemaPartialContext = UiContext & {
    ui: UiHelpers;
};

export type SchemaContext<_V extends FhirVersion = FhirVersion> = SchemaPartialContext & {
    ui: UiHelpers;
    resources: MgoResourceMeta[];
    organization?: {
        name?: string;
    };
};

export function createSchemaContext<V extends FhirVersion>(
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
