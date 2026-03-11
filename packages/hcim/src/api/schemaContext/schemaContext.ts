import { NictizNlProfile, type FhirVersion } from '@minvws/mgo-fhir';
import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import {
    type FormatHelpers,
    type UiContext,
    type UiContextOptions,
    type UiHelpers,
    createFormatHelpers,
    createUiContext,
    createUiHelpers,
} from '@minvws/mgo-hcim-ui';

export type SchemaOptions<V extends FhirVersion> = UiContextOptions & {
    resources?: MgoResourceMeta<NictizNlProfile, V>[];
    organization?: {
        name?: string;
    };
};

export type SchemaPartialContext = UiContext & {
    ui: UiHelpers;
    format: FormatHelpers;
};

export type SchemaContext<V extends FhirVersion = FhirVersion> = SchemaPartialContext & {
    ui: UiHelpers;
    format: FormatHelpers;
    resources: MgoResourceMeta<NictizNlProfile, V>[];
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
    const formatHelpers = createFormatHelpers(uiContext);

    return {
        ...uiContext,
        ui: uiHelpers,
        format: formatHelpers,
        resources,
        organization,
        isSummary,
    };
}
