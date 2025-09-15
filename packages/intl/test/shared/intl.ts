/* c8 ignore start - This code is for testing purposes only */

import { type IntlShape, type MessageDescriptor } from '@formatjs/intl';
import { Locale } from '../../src/locale.js';
import { type FormatMessageStringValues } from '../../src/types/index.js';
import { testMessage } from './testMessage.js';

export function createTestIntl<T extends string>(): IntlShape<T> {
    const mockIntl = {
        locale: Locale.NL_NL,
        messages: {},
        formatMessage: (value: MessageDescriptor, values: FormatMessageStringValues) =>
            testMessage(value.id, values),
    } satisfies Partial<IntlShape<T>>;

    return mockIntl as unknown as IntlShape<T>;
}
