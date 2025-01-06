interface UiSchemaNode {
    label: string;
}

export interface UiEntryOptions {
    showEmpty?: boolean;
}

interface BaseUiElement<T extends string> extends UiSchemaNode, UiEntryOptions {
    type: T;
}

interface UiDisplayElement<T extends string, Display> extends BaseUiElement<T> {
    display: Display | undefined;
}

/**
 * Note: using `undefined` as the `Display` type breaks the Kotlin types.
 */
export interface SingleValue extends UiDisplayElement<'SINGLE_VALUE', string> {}
export interface MultipleValues extends UiDisplayElement<'MULTIPLE_VALUES', string[]> {}
export interface MultipleGroupedValues
    extends UiDisplayElement<'MULTIPLE_GROUPED_VALUES', string[][]> {}
export interface ReferenceValue extends UiDisplayElement<'REFERENCE_VALUE', string> {
    reference: string | undefined;
}

export interface DownloadLink extends BaseUiElement<'DOWNLOAD_LINK'> {
    url: string;
}

export type UiElement =
    | SingleValue
    | MultipleValues
    | MultipleGroupedValues
    | ReferenceValue
    | DownloadLink;

export interface UiSchemaGroup {
    label?: string;
    children: UiElement[];
}

export interface UiSchema {
    label: string | undefined;
    children: UiSchemaGroup[];
}
