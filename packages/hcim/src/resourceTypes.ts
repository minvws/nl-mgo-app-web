import { FhirVersion, type BackboneElement, type FhirResource } from '@minvws/mgo-fhir';
import { MgoElementMeta, type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import {
    HealthUiGroup,
    HealthUiGroupFunction,
    HealthUiSchema,
    HealthUiSchemaFunction,
    UiContext,
    UiElement,
} from '@minvws/mgo-hcim-ui';
import { type Nullable } from '@minvws/mgo-utils';
import { SchemaContext } from './api/schemaContext/schemaContext.js';

export type SchemaFunctionWithSchemaContext<T extends MgoResourceMeta> = (
    parsedResource: T,
    context: SchemaContext<T['fhirVersion']>
) => HealthUiSchema;

export type SummarySchemaFunction<T extends MgoResourceMeta> = HealthUiSchemaFunction<
    T,
    SchemaContext<T['fhirVersion']>
>;

export type SummaryElementFunction<
    T extends MgoElementMeta | MgoElementMeta[],
    Context extends SchemaContext,
> = (parsedResource: Nullable<T>, context: Context) => UiElement[];

export type CardIconNames = 'calendar_today' | 'favorite-fill'; // Even ter illustratie, maar het zal een subset zijn van de file names uit de `@material-symbols` (google material icons)

export type DetailSchemaFunction<T extends MgoResourceMeta> = HealthUiSchemaFunction<T, UiContext>;

export interface HcimCardDetails {
    title: string;
    description?: string;
    descriptionIcon?: CardIconNames;
    detail?: string;
}

export type CardDetailsFunction<T extends MgoResourceMeta> = (
    parsedResource: T,
    context: SchemaContext<T['fhirVersion']>
) => HcimCardDetails;

type ResourceParserFunction<
    Resource extends FhirResource,
    ParsedResource extends MgoResourceMeta,
> = (resource: Resource) => ParsedResource;

export interface ResourceConfig<
    V extends FhirVersion,
    Resource extends FhirResource<V>,
    ParsedResource extends MgoResourceMeta,
> {
    profile: MgoResourceMeta['profile'];
    parse: ResourceParserFunction<Resource, ParsedResource>;
    uiSchema: DetailSchemaFunction<ParsedResource>;
    summary?: SummarySchemaFunction<ParsedResource>;
    card?: CardDetailsFunction<ParsedResource>;
}

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource | undefined;

export interface ResourceElementConfig<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    summary?: HealthUiGroupFunction<ParsedResource, HealthUiGroup | HealthUiGroup[], SchemaContext>;
    uiSchemaGroup: HealthUiGroupFunction<
        ParsedResource,
        HealthUiGroup | HealthUiGroup[],
        SchemaContext
    >;
}
