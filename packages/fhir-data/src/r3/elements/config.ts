import { type BackboneElement } from 'fhir/r3';
import { type Nullable } from '../../types/Nullable';
import { type UiSchemaGroup, type UiSchemaGroupFunction } from '../../ui/types';

type ElementParserFunction<T extends BackboneElement, ParsedResource extends object> = (
    resource: Nullable<T>
) => ParsedResource;

export interface ResourceElementConfigR3<
    Resource extends BackboneElement,
    ParsedResource extends object,
> {
    parse: ElementParserFunction<Resource, ParsedResource>;
    uiSchemaGroup: UiSchemaGroupFunction<ParsedResource, UiSchemaGroup | UiSchemaGroup[]>;
}
