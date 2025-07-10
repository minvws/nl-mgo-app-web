import { type BackboneElement, type FhirResource } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-utils';
import { type MgoResourceMeta } from './parse/helpers/resourceMeta/resourceMeta';
import { type HealthUiSchemaFunction } from './ui';
import { type HealthUiGroup, type HealthUiGroupFunction } from './ui/types';

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
    uiSchema: HealthUiSchemaFunction<ParsedResource>;
    summary?: HealthUiSchemaFunction<ParsedResource>;
}

export interface MgoElementMeta<T extends NictizNlProfile = NictizNlProfile> {
    _profile: T;
}

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource | undefined;

export interface ResourceElementConfig<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    summary?: HealthUiGroupFunction<ParsedResource, HealthUiGroup | HealthUiGroup[]>;
    uiSchemaGroup: HealthUiGroupFunction<ParsedResource, HealthUiGroup | HealthUiGroup[]>;
}
