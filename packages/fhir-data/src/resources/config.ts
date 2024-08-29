import { type FhirResource } from '../fhir/index';
import { type UiSchema } from '../ui';
import { type MgoResourceMeta } from './resourceMeta/resourceMeta';

type ParserFunction<T extends FhirResource, ParsedResource extends MgoResourceMeta> = (
    resource: T
) => ParsedResource;

type UiSchemaFunction<ParsedResource extends MgoResourceMeta> = (
    parsedResource: ParsedResource
) => UiSchema;

export interface ResourceConfig<
    Resource extends FhirResource,
    ParsedResource extends MgoResourceMeta,
> {
    profile: MgoResourceMeta['profile'];
    parse: ParserFunction<Resource, ParsedResource>;
    uiSchema: UiSchemaFunction<ParsedResource>;
}
