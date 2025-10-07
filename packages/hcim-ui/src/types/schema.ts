interface BaseUiElement<T extends string> {
    type: T;
    label: string;
}

export interface DisplayValue {
    display: string | undefined;
    code?: string;
    system?: string;
}

export interface SingleValue extends BaseUiElement<'SINGLE_VALUE'> {
    value: DisplayValue | undefined;
}
export interface MultipleValues extends BaseUiElement<'MULTIPLE_VALUES'> {
    value: DisplayValue[] | undefined;
}
export interface MultipleGroupedValues extends BaseUiElement<'MULTIPLE_GROUPED_VALUES'> {
    value: DisplayValue[][] | undefined;
}

export interface ReferenceValue extends BaseUiElement<'REFERENCE_VALUE'> {
    reference: string | undefined;
    display: string | undefined;
}

export interface DownloadLink extends BaseUiElement<'DOWNLOAD_LINK'> {
    url?: string;
}

export interface DownloadBinary extends BaseUiElement<'DOWNLOAD_BINARY'> {
    reference?: string;
}

export interface ReferenceLink extends BaseUiElement<'REFERENCE_LINK'> {
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
