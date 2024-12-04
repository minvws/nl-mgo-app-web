import { type Lossless } from '../types/Lossless';
import { type Nullable } from '../types/Nullable';

interface UiSchemaElement {
    label: string;
}

export interface UiEntryOptions {
    showEmpty?: boolean;
}

interface BaseUiEntry<T extends string> extends UiSchemaElement, UiEntryOptions {
    type: T;
}

export interface UiEntryValue<T extends string, D> extends BaseUiEntry<T> {
    display: D | undefined;
}

export interface SingleValue extends UiEntryValue<'SINGLE_VALUE', string> {}
export interface MultipleValues extends UiEntryValue<'MULTIPLE_VALUES', string[]> {}
export interface MultipleGroupedValues
    extends UiEntryValue<'MULTIPLE_GROUPED_VALUES', string[][]> {}
export interface ReferenceValue extends UiEntryValue<'REFERENCE_VALUE', string> {
    reference: string | undefined;
}

export interface DownloadLink extends BaseUiEntry<'DOWNLOAD_LINK'> {
    url: string;
}

export type UiEntry =
    | SingleValue
    | MultipleValues
    | MultipleGroupedValues
    | ReferenceValue
    | DownloadLink;

export interface UiSchemaGroup extends UiSchemaElement {
    children: UiEntry[];
}

export interface UiSchema {
    label: string | undefined;
    children: UiSchemaGroup[];
}

export type UiFunction<Input, Output extends UiEntry | UiEntry[]> = (
    label: string,
    value: Nullable<Lossless<Input>>,
    options?: UiEntryOptions
) => Output;

export type CombinedUiFunction<Input1, Input2, Output extends UiEntry | UiEntry[]> = (
    label: string,
    value1: Nullable<Lossless<Input1>>,
    value2: Nullable<Lossless<Input2>>,
    options?: UiEntryOptions
) => Output;
