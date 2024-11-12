import { type FhirResource } from 'fhir/r3';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type UiSchema } from '../../ui';

type ParserFunction<T extends FhirResource, ParsedResource extends MgoResourceMeta> = (
    resource: T
) => ParsedResource;

type UiSchemaFunction<ParsedResource extends MgoResourceMeta> = (
    parsedResource: ParsedResource
) => UiSchema;

export interface ResourceConfigR3<
    Resource extends FhirResource,
    ParsedResource extends MgoResourceMeta,
> {
    profile: MgoResourceMeta['profile'];
    parse: ParserFunction<Resource, ParsedResource>;
    uiSchema: UiSchemaFunction<ParsedResource>;
}
