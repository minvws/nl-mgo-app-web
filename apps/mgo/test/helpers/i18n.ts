import { type MessageDescriptor, createIntl, createIntlCache } from '@formatjs/intl';
import escapeStringRegexp from 'escape-string-regexp';
import messagesNL from '../../src/i18n/locales/nl.json';

const cache = createIntlCache();

const intl = createIntl(
    {
        locale: 'nl',
        messages: messagesNL,
    },
    cache
);

type Values = Parameters<typeof intl.formatMessage>[1];

export function message(messageId: MessageDescriptor['id'], values?: Values) {
    return intl.formatMessage({ id: messageId }, values) as string;
}

export function messageRegexp(messageId: MessageDescriptor['id'], values?: Values) {
    const messageValue = message(messageId, values);
    return new RegExp(escapeStringRegexp(messageValue));
}
