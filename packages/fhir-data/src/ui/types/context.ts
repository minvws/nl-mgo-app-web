import { type IntlShape } from '@formatjs/intl';
import { type Locale } from '../../i18n';
import { type MessagesIds } from '../../i18n/messages';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type Lossless } from '../../types/Lossless';
import { type Nullable } from '../../types/Nullable';
import { type Ui } from '../context/ui';
import { type UiEntry, type UiEntryOptions, type UiSchema, type UiSchemaGroup } from './schema';

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

export type FormatDisplayFunction<Input, Output extends string[] | string | undefined = string> = (
    value: Nullable<Lossless<Input>>
) => Output;

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

export type SetEmptyEntriesHelper = (schema: UiSchema) => UiSchema;
export type UiSchemaContext = UiHelperContext & {
    ui: Ui;
    setEmptyEntries: SetEmptyEntriesHelper;
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
