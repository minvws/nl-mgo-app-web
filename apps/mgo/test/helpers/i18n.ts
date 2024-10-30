import { type MessageDescriptor, createIntl, createIntlCache } from '@formatjs/intl';
import escapeStringRegexp from 'escape-string-regexp';
import { messagesNL } from '../../src/i18n/messages';

const cache = createIntlCache();

const ignoreDefaulMessageError = (error: Error) => {
    if (
        typeof error.message === 'string' &&
        error.message.includes('[@formatjs/intl Error MISSING_TRANSLATION]')
    ) {
        return;
    }
};

const intl = createIntl(
    {
        locale: 'nl',
        messages: messagesNL,
        onError: ignoreDefaulMessageError,
    },
    cache
);

type Values = Parameters<typeof intl.formatMessage>[1];

export function message(messageId: MessageDescriptor['id'], values?: Values) {
    return (intl.formatMessage({ id: messageId }, values) as string).trim();
}

export function messageRegexp(messageId: MessageDescriptor['id'], values?: Values) {
    const messageValue = message(messageId, values);
    return new RegExp(escapeStringRegexp(messageValue));
}
