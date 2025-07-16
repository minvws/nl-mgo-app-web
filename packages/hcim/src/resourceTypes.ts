import { type BackboneElement, type FhirResource } from '@minvws/mgo-fhir';
import {
    HealthUiGroup,
    HealthUiGroupFunction,
    HealthUiSchema,
    HealthUiSchemaFunction,
    UiContext,
} from '@minvws/mgo-hcim-ui';
import { type Nullable } from '@minvws/mgo-utils';
import { type MgoResourceMeta } from '../../hcim-parse/src/helpers/resourceMeta/resourceMeta';
import { SchemaContext } from './api/schemaContext/schemaContext';

export type SchemaFunctionWithSchemaContext<T extends MgoResourceMeta> = (
    parsedResource: T,
    context: SchemaContext<T['fhirVersion']>
) => HealthUiSchema;

export type SummarySchemaFunction<T extends MgoResourceMeta> = HealthUiSchemaFunction<
    T,
    SchemaContext<T['fhirVersion']>
>;
export type DetailSchemaFunction<T extends MgoResourceMeta> = HealthUiSchemaFunction<T, UiContext>;

type ResourceParserFunction<
    Resource extends FhirResource,
    ParsedResource extends MgoResourceMeta,
> = (resource: Resource) => ParsedResource;

export interface ResourceConfig<
    Resource extends FhirResource<ParsedResource['fhirVersion']>,
    ParsedResource extends MgoResourceMeta,
> {
    profile: MgoResourceMeta['profile'];
    parse: ResourceParserFunction<Resource, ParsedResource>;
    uiSchema: DetailSchemaFunction<ParsedResource>;
    summary?: SchemaFunctionWithSchemaContext<ParsedResource>;
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
