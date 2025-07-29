/* c8 ignore start - This code is for testing purposes only */

import { createIntl } from '@formatjs/intl';
import escapeStringRegexp from 'escape-string-regexp';
import {
    getFhirIntlConfig,
    type FhirIntlShape,
    type FhirMessagesIds,
} from '../../src/config/fhir/fhir.js';
import { Locale } from '../../src/locale.js';
import { type FormatMessageStringValues } from '../../src/types/index.js';

const fhirIntl = createIntl(getFhirIntlConfig({ locale: Locale.NL_NL })) as FhirIntlShape;

export function fhirMessage(id: FhirMessagesIds, values?: FormatMessageStringValues) {
    return fhirIntl.formatMessage({ id }, values).trim();
}

export function fhirMessageRegexp(id: FhirMessagesIds, values?: FormatMessageStringValues) {
    const messageValue = fhirMessage(id, values);
    return new RegExp(escapeStringRegexp(messageValue));
}
