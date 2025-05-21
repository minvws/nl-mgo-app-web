/* c8 ignore start - This code is for testing purposes only */

import { type IntlShape, type MessageDescriptor } from '@formatjs/intl';
import { Locale } from '../locale';
import { type FormatMessageStringValues } from '../types';
import { testMessage } from './testMessage';

export function createTestIntl<T extends string>(): IntlShape<T> {
    const mockIntl = {
        locale: Locale.NL_NL,
        messages: {},
        formatMessage: (value: MessageDescriptor, values: FormatMessageStringValues) =>
            testMessage(value.id, values),
    } satisfies Partial<IntlShape<T>>;

    return mockIntl as unknown as IntlShape<T>;
}
