import {
    type IntlFormatters,
    type IntlShape,
    type MessageDescriptor,
    type ResolvedIntlConfig,
} from '@formatjs/intl';
import {
    type FormatXMLElementFn,
    type Options as IntlMessageFormatOptions,
    type PrimitiveType,
} from 'intl-messageformat';

export interface CustomMessageDescriptor<MessagesIds> extends Omit<MessageDescriptor, 'id'> {
    readonly id: MessagesIds;
}

export type FormatMessageStringValues = Record<
    string,
    PrimitiveType | FormatXMLElementFn<string, string>
>;

/**
 * A custom type to change the messages descriptor type.
 * This is used to set a specific MessageId instead of relying on a global type value.
 * It attempts to maintain the original overloading character of the formatMessage function.
 */
export interface CustomMessageDescriptors<TBase, MessageDescriptor> {
    formatMessage(
        this: void,
        descriptor: MessageDescriptor,
        values?: FormatMessageStringValues,
        opts?: IntlMessageFormatOptions
    ): string;
    formatMessage<T extends TBase, TValue extends T | FormatXMLElementFn<T>>(
        this: void,
        descriptor: MessageDescriptor,
        values?: Record<string, PrimitiveType | TValue>,
        opts?: IntlMessageFormatOptions
    ): string | T | Array<string | T>;
    $t(
        this: void,
        descriptor: MessageDescriptor,
        values?: FormatMessageStringValues,
        opts?: IntlMessageFormatOptions
    ): string;
    $t<T extends TBase>(
        this: void,
        descriptor: MessageDescriptor,
        values?: Record<string, PrimitiveType | T | FormatXMLElementFn<T>>,
        opts?: IntlMessageFormatOptions
    ): string | T | (T | string)[];
}

// We use this custom IntlShape instead of the regular `IntlShape` because the
// internal `IntlMessageFormat` types used by react-intl and @formatjs/intl are not compatible.
// Not including the `formatters` property avoids having to cast the shape to `unknown` first.
type CoreIntlShape<TBase> = IntlFormatters<TBase> & ResolvedIntlConfig<TBase>;

export interface CustomIntlShape<TBase = string, MessageIds extends string = string>
    extends Omit<CoreIntlShape<TBase>, 'messages' | '$t' | 'formatMessage'>,
        CustomMessageDescriptors<TBase, CustomMessageDescriptor<MessageIds>> {
    messages: Record<MessageIds, IntlShape['messages'][number]>;
}
