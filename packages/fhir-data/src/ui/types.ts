import { type IntlShape } from '@formatjs/intl';
import { type Locale } from '../i18n';
import { type MessagesIds } from '../i18n/messages';
import { type MgoResourceMeta } from '../parse/helpers/resourceMeta/resourceMeta';
import { type Lossless } from '../types/Lossless';
import { type Nullable } from '../types/Nullable';
import { type Ui } from './context/ui';

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
export interface MultipleValues extends UiEntryValue<'MULTIPLE_VALUES', (string | undefined)[]> {}
export interface MultipleGroupedValues
    extends UiEntryValue<'MULTIPLE_GROUPED_VALUES', (string | undefined)[][]> {}
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

type PrimitiveType = string | number | boolean | null | undefined | Date;

export type FormatMessageHelper = (
    id: MessagesIds,
    values?: Record<string, PrimitiveType>
) => string;
export type HasMessageHelper = (id: string) => id is MessagesIds;

export type UiHelperContext = {
    intl: IntlShape;
    formatMessage: FormatMessageHelper;
    hasMessage: HasMessageHelper;
};

export type WithUiContext<T> = (context: UiHelperContext) => T;

export type UiFunction<Input, Output extends UiEntry | UiEntry[], Label = MessagesIds> = (
    label: Label,
    value: Nullable<Lossless<Input>>,
    options?: UiEntryOptions
) => Output;

export type UiFunctionWithoutLabel<Input, Output extends UiEntry | UiEntry[]> = (
    value: Nullable<Lossless<Input>>,
    options?: UiEntryOptions
) => Output;

export type CombinedUiFunction<Input1, Input2, Output extends UiEntry | UiEntry[]> = (
    label: MessagesIds,
    value1: Nullable<Lossless<Input1>>,
    value2: Nullable<Lossless<Input2>>,
    options?: UiEntryOptions
) => Output;

export type UiSchemaOptions = {
    locale: Locale;
};

export type UiSchemaContext = UiHelperContext & {
    ui: Ui;
};

export type UiSchemaFunction<ParsedResource extends MgoResourceMeta> = (
    parsedResource: ParsedResource,
    context: UiSchemaContext
) => UiSchema;

export type UiSchemaGroupFunction<
    ParsedResource extends object,
    G extends UiSchemaGroup | UiSchemaGroup[] = UiSchemaGroup,
> = (parsedResource: ParsedResource, context: UiSchemaContext) => G;

export type NonStrictLabel<T> = T extends (a: MessagesIds, ...args: infer U) => infer R
    ? (a: MessagesIds | string, ...args: U) => R
    : T;

export type NonStrictUi = {
    [K in keyof Ui]: NonStrictLabel<Ui[K]>;
};
