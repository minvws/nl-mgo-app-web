import { type BackboneElement } from 'fhir/r4';
import { type Nullable } from '../../types/Nullable';
import { type UiSchemaGroup } from '../../ui';
import { type UiSchemaGroupFunction } from '../../ui/types';

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource | undefined;

export interface R4ResourceElementConfig<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    uiSchemaGroup: UiSchemaGroupFunction<ParsedResource, UiSchemaGroup | UiSchemaGroup[]>;
}
