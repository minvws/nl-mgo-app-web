import { type BackboneElement } from 'fhir/r3';
import { type Nullable } from '../../types/Nullable';
import { type UiSchemaGroup } from '../../ui';

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource;

type UiSchemaGroupFunction<ParsedResource extends object> = (
    parsedResource: ParsedResource
) => UiSchemaGroup;

export interface ResourceElementConfigR3<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    uiSchemaGroup: UiSchemaGroupFunction<ParsedResource>;
}
