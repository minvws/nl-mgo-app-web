import { type BackboneElement, type FhirResource } from '@minvws/mgo-fhir-types';
import { type MgoResourceMeta } from '../parse/helpers/resourceMeta/resourceMeta';
import { type UiSchemaFunction } from '../ui';
import { type UiSchemaGroup, type UiSchemaGroupFunction } from '../ui/types';
import { type Nullable } from './Nullable';

export type NictizNlProfile =
    | `http://fhir.nl/fhir/StructureDefinition/${string}`
    | `http://nictiz.nl/fhir/StructureDefinition/${string}`;

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
    uiSchema: UiSchemaFunction<ParsedResource>;
    summary?: UiSchemaFunction<ParsedResource>;
}

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource | undefined;

export interface ResourceElementConfig<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    summary?: UiSchemaGroupFunction<ParsedResource, UiSchemaGroup | UiSchemaGroup[]>;
    uiSchemaGroup: UiSchemaGroupFunction<ParsedResource, UiSchemaGroup | UiSchemaGroup[]>;
}
