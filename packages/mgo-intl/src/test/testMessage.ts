/* c8 ignore start - This code is for testing purposes only */

import { type FormatMessageStringValues } from '../types';

export function testMessage(id?: string, values?: FormatMessageStringValues) {
    return values ? `intl(${id}, ${JSON.stringify(values)})` : `intl(${id})`;
}
