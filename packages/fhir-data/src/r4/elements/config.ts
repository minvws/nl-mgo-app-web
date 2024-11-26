import { type BackboneElement } from 'fhir/r4';
import { type Nullable } from '../../types/Nullable';
import { type UiSchemaGroup } from '../../ui';

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource | undefined;

type UiSchemaGroupFunction<ParsedResource extends object> = (
    parsedResource: ParsedResource
) => UiSchemaGroup;

export interface R4ResourceElementConfig<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    uiSchemaGroup: UiSchemaGroupFunction<ParsedResource>;
}
