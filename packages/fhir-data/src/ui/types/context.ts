import { type MessagesIds } from '../../i18n/messages';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type Lossless } from '../../types/Lossless';
import { type Nullable } from '../../types/Nullable';
import { type UiSchemaContext } from '../context/context';
import { type Ui, type UiHelperContext } from '../context/ui';
import { type UiElement, type UiSchema, type UiSchemaGroup } from './schema';

type PrimitiveType = string | number | boolean | null | undefined | Date;

export type FormatMessageHelper = (
    id: MessagesIds,
    values?: Record<string, PrimitiveType>
) => string;
export type HasMessageHelper = (id: string) => id is MessagesIds;

export type WithUiHelperContext<T> = (context: UiHelperContext) => T;

export type FormatFunction<Input, Output extends string | string[] = string> = (
    value: Nullable<Lossless<Input>>
) => Output | undefined;

export type FormatDisplayFunction<Input, Output extends string[] | string | undefined = string> = (
    value: Nullable<Lossless<Input>>
) => Output;

export type UiFunctionWithOptions<
    Input,
    Output extends UiElement | UiElement[],
    Options,
    Label = MessagesIds,
> = (label: Label, value: Nullable<Lossless<Input>>, options?: Options) => Output;

export type UiFunction<Input, Output extends UiElement | UiElement[], Label = MessagesIds> = (
    label: Label,
    value: Nullable<Lossless<Input>>
) => Output;

export type UiFunctionWithoutLabel<Input, Output extends UiElement | UiElement[]> = (
    value: Nullable<Lossless<Input>>
) => Output;

export type CombinedUiFunction<Input1, Input2, Output extends UiElement | UiElement[]> = (
    label: MessagesIds,
    value1: Nullable<Lossless<Input1>>,
    value2: Nullable<Lossless<Input2>>
) => Output;

export type UiSchemaFunction<T extends MgoResourceMeta> = (
    parsedResource: T,
    context: UiSchemaContext<T['fhirVersion']>
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
