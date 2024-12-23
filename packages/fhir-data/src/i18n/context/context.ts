import { createIntl, type IntlOptions } from '../intl/intl';
import { type MessagesIds } from '../messages';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';

type PrimitiveType = string | number | boolean | null | undefined | Date;

export function createI18nContext(options: IntlOptions) {
    const intl = createIntl(options);

    const formatMessage = (id: MessagesIds, values?: Record<string, PrimitiveType>) =>
        intl.formatMessage({ id }, values);
    const hasMessage = (id: string): id is MessagesIds =>
        isNonNullish(intl.messages[id as MessagesIds]);

    return {
        intl,
        formatMessage,
        hasMessage,
    };
}

export type I18nContext = ReturnType<typeof createI18nContext>;
