import { type BackboneElement } from '../../types/FhirRX';
import { type Nullable } from '../../types/Nullable';
import { type UiSchemaGroup } from '../../ui';

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource;

type UiSchemaGroupFunction<ParsedResource extends object> = (
    parsedResource: ParsedResource
) => UiSchemaGroup;

export interface RxResourceElementConfig<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    uiSchemaGroup: UiSchemaGroupFunction<ParsedResource>;
}
