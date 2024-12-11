interface UiSchemaElement {
    label: string;
}

export interface UiEntryOptions {
    showEmpty?: boolean;
}

interface BaseUiEntry<T extends string> extends UiSchemaElement, UiEntryOptions {
    type: T;
}

export interface UiEntryValue<T extends string, Display> extends BaseUiEntry<T> {
    display: Display | undefined;
}

/**
 * Note: using `undefined` as the `Display` type breaks the Kotlin types.
 */
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
