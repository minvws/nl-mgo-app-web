import { type MessagesIds } from '../../i18n/messages';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type Lossless } from '../../types/Lossless';
import { type Nullable } from '../../types/Nullable';
import { type HealthUiSchemaContext } from '../context/context';
import { type Ui, type UiHelperContext } from '../context/ui';
import { type HealthUiGroup, type HealthUiSchema, type UiElement } from './schema';

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
    value: Nullable<Input>
) => Output;

export type CombinedUiFunction<Input1, Input2, Output extends UiElement | UiElement[]> = (
    label: MessagesIds,
    value1: Nullable<Lossless<Input1>>,
    value2: Nullable<Lossless<Input2>>
) => Output;

export type HealthUiSchemaFunction<T extends MgoResourceMeta> = (
    parsedResource: T,
    context: HealthUiSchemaContext<T['fhirVersion']>
) => HealthUiSchema;

export type HealthUiGroupFunction<
    ParsedResource extends object,
    G extends HealthUiGroup | HealthUiGroup[] = HealthUiGroup,
> = (parsedResource: ParsedResource, context: HealthUiSchemaContext) => G;

export type NonStrictLabel<T> = T extends (a: MessagesIds, ...args: infer U) => infer R
    ? (a: MessagesIds | string, ...args: U) => R
    : T;

export type NonStrictUi = {
    [K in keyof Ui]: NonStrictLabel<Ui[K]>;
};
