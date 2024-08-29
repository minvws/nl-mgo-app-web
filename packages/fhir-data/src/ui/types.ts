import { type Lossless } from '../types/Lossless';
import { type Nullable } from '../types/Nullable';

interface UiSchemaElement {
    label: string;
}

export interface ValueOptions {
    summary?: boolean;
}

interface BaseEntry<T extends string | string[] | string[][]>
    extends UiSchemaElement,
        ValueOptions {
    display: T | undefined;
    type: string;
}

export interface SingleValue extends BaseEntry<string> {}
export interface MultipleValue extends BaseEntry<string[]> {}
export interface MultipleGroupValue extends BaseEntry<string[][]> {}

export interface Reference extends SingleValue {
    reference: string | undefined;
}

// We don't export this union as we want to enforce the use of a more specific type
type UiEntry = SingleValue | MultipleValue | MultipleGroupValue | Reference;

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
    options?: ValueOptions
) => Output;
