import { type IntlFormatters, type ResolvedIntlConfig } from '@formatjs/intl';
import { type CustomIntlShape, type CustomMessageDescriptors } from '../types';

type AbstractIntlShape<TBase, MessageIds extends string> =
    | (IntlFormatters<TBase> & Pick<ResolvedIntlConfig, 'messages'>)
    | CustomIntlShape<TBase, MessageIds>;

export function createHelpers<TBase, MessageIds extends string>(
    intl: AbstractIntlShape<TBase, MessageIds>
) {
    type ExtractedMessagesIds = Extract<keyof (typeof intl)['messages'], string>;

    const formatMessage: CustomMessageDescriptors<TBase, ExtractedMessagesIds>['formatMessage'] = (
        id: ExtractedMessagesIds,
        ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => intl.formatMessage({ id }, ...args);

    const hasMessage = (id: string): id is ExtractedMessagesIds =>
        Object.prototype.hasOwnProperty.call(intl.messages, id);

    return {
        formatMessage,
        hasMessage,
    };
}
