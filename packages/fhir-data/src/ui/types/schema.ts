interface BaseUiElement<T extends string> {
    type: T;
}

interface BaseUiValueElement<T extends string, Display> extends BaseUiElement<T> {
    label: string;
    display: Display | undefined;
}

/**
 * Note: using `undefined` as the `Display` type breaks the Kotlin types.
 */
export type SingleValue = BaseUiValueElement<'SINGLE_VALUE', string>;
export type MultipleValues = BaseUiValueElement<'MULTIPLE_VALUES', string[]>;
export type MultipleGroupedValues = BaseUiValueElement<'MULTIPLE_GROUPED_VALUES', string[][]>;
export interface ReferenceValue extends BaseUiValueElement<'REFERENCE_VALUE', string> {
    reference: string | undefined;
}

export interface DownloadLink extends BaseUiElement<'DOWNLOAD_LINK'> {
    label: string;
    url?: string;
}

export interface DownloadBinary extends BaseUiElement<'DOWNLOAD_BINARY'> {
    label: string;
    reference?: string;
}

export interface ReferenceLink extends BaseUiElement<'REFERENCE_LINK'> {
    label: string;
    reference: string;
}

export type UiElement =
    | SingleValue
    | MultipleValues
    | MultipleGroupedValues
    | ReferenceValue
    | DownloadLink
    | DownloadBinary
    | ReferenceLink;

export interface HealthUiGroup {
    label?: string;
    children: UiElement[];
}

export interface HealthUiSchema {
    label: string;
    children: HealthUiGroup[];
}
