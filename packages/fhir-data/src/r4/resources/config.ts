import { type FhirResource } from 'fhir/r4';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type UiSchemaFunction } from '../../ui';
import { type I18nContext } from '../../i18n';

type ParserFunction<T extends FhirResource, ParsedResource extends MgoResourceMeta> = (
    resource: T,
    i18nContext: I18nContext
) => ParsedResource | undefined;

export interface ResourceConfigR4<
    Resource extends FhirResource,
    ParsedResource extends MgoResourceMeta,
> {
    profile: MgoResourceMeta['profile'];
    parse: ParserFunction<Resource, ParsedResource>;
    uiSchema: UiSchemaFunction<ParsedResource>;
}
