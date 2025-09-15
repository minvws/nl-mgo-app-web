/* c8 ignore start - This code is for testing purposes only */

import { createIntl } from '@formatjs/intl';
import escapeStringRegexp from 'escape-string-regexp';
import {
    getAppIntlConfig,
    type AppIntlShape,
    type AppMessagesIds,
} from '../../src/config/app/app.js';
import { Locale } from '../../src/locale.js';
import { type FormatMessageStringValues } from '../../src/types/index.js';

const appIntl = createIntl(
    getAppIntlConfig({ locale: Locale.NL_NL, ignoreMissingTranslations: true })
) as AppIntlShape;

export function appMessage(id: AppMessagesIds, values?: FormatMessageStringValues) {
    return appIntl.formatMessage({ id }, values).trim();
}

export function appMessageRegexp(id: AppMessagesIds, values?: FormatMessageStringValues) {
    const messageValue = appMessage(id, values);
    return new RegExp(escapeStringRegexp(messageValue));
}
