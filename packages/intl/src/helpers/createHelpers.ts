import { type IntlFormatters, type ResolvedIntlConfig } from '@formatjs/intl';
import { type CustomIntlShape, type CustomMessageDescriptors } from '../types/index.js';

type AbstractIntlShape<TBase, MessageIds extends string> =
    | (IntlFormatters<TBase> & Pick<ResolvedIntlConfig, 'messages'>)
    | CustomIntlShape<TBase, MessageIds>;

export type IntlHelpers<TBase, MessageIds extends string> = {
    formatMessage: CustomMessageDescriptors<TBase, MessageIds>['formatMessage'];
    hasMessage: (id: string) => id is MessageIds;
};

export function createHelpers<TBase, MessageIds extends string>(
    intl: AbstractIntlShape<TBase, MessageIds>
): IntlHelpers<TBase, MessageIds> {
    type ExtractedMessagesIds = Extract<keyof (typeof intl)['messages'], string>;

    const formatMessage: CustomMessageDescriptors<TBase, ExtractedMessagesIds>['formatMessage'] = (
        id: ExtractedMessagesIds,
        ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => intl.formatMessage({ id }, ...args);

    const hasMessage = (id: string): id is ExtractedMessagesIds => Object.hasOwn(intl.messages, id);

    return {
        formatMessage,
        hasMessage,
    };
}
