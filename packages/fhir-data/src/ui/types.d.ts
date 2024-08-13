interface UiSchemaElement {
    label: string;
}

export interface ValueOptions {
    summary?: boolean;
}

interface BaseValueDescription<T extends string | string[] | string[][]>
    extends UiSchemaElement,
        ValueOptions {
    display: T | null;
    type: string;
}

export interface SingleValue extends BaseValueDescription<string> {}
export interface MultipleValue extends BaseValueDescription<string[]> {}
export interface MultipleGroupValue extends BaseValueDescription<string[][]> {}

export interface Reference extends SingleValue {
    reference: string | null;
}

export type ValueDescription = SingleValue | MultipleValue | MultipleGroupValue | Reference;

export interface UiSchemaGroup extends UiSchemaElement {
    children: ValueDescription[];
}

export interface UiSchema extends UiSchemaElement {
    children: UiSchemaGroup[];
}
