import { type MgoResourceMeta, type ValueType } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { type Lossless, type Nullable } from '@minvws/mgo-utils';
import { type UiContext } from '../context/index.js';
import { type UiHelpers } from '../ui.js';
import { type HealthUiGroup, type HealthUiSchema, type UiElement } from './schema.js';

export type WithUiContext<T> = (context: UiContext) => T;

export type FormatFunction<Input, Output extends string | string[] = string> = (
    value: Nullable<Input | Lossless<Input>>
) => Output | undefined;

export type FormatDisplayFunction<Input, Output extends string[] | string | undefined = string> = (
    value: Nullable<Input | Lossless<Input>>
) => Output;

export type UiFunctionOptions = {
    defaultLabel?: FhirMessagesIds;
};

export type UiFunction<
    Input extends ValueType | ValueType[],
    Output extends UiElement | UiElement[] | HealthUiGroup,
    Label = FhirMessagesIds,
    Options extends UiFunctionOptions = UiFunctionOptions,
> = (label: Label, value: Nullable<Input>, options?: Options) => Output;

export type UiFunctionWithoutLabel<Input, Output extends UiElement | UiElement[]> = (
    value: Nullable<Input>
) => Output;

export type CombinedUiFunction<Input1, Input2, Output extends UiElement | UiElement[]> = (
    label: FhirMessagesIds,
    value1: Nullable<Input1>,
    value2: Nullable<Input2>
) => Output;

export type HealthUiSchemaFunction<T extends MgoResourceMeta, Context> = (
    parsedResource: T,
    context: Context
) => HealthUiSchema;

export type HealthUiGroupFunction<
    ParsedResource extends object,
    G extends HealthUiGroup | HealthUiGroup[],
    Context,
> = (parsedResource: ParsedResource, context: Context) => G;

export type NonStrictLabel<T> = T extends (a: FhirMessagesIds, ...args: infer U) => infer R
    ? (a: FhirMessagesIds | string, ...args: U) => R
    : T;

export type NonStrictUi = {
    [K in keyof UiHelpers]: NonStrictLabel<UiHelpers[K]>;
};
