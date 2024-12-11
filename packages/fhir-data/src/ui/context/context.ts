import { getIntl, type IntlOptions } from '../../i18n';
import {
    type HasMessageHelper,
    type FormatMessageHelper,
    type UiHelperContext,
    type UiSchemaContext,
} from '../types';
import { getUi } from './ui';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';
import { type MessagesIds } from '../../i18n/messages';
import { setEmptyEntries } from '../helpers';

export function createUiSchemaContext(options: IntlOptions): UiSchemaContext {
    const intl = getIntl(options);

    const formatMessage: FormatMessageHelper = (id, values) => intl.formatMessage({ id }, values);
    const hasMessage: HasMessageHelper = (id): id is MessagesIds =>
        isNonNullish(intl.messages[id as MessagesIds]);

    const uiHelperContext: UiHelperContext = {
        intl,
        formatMessage,
        hasMessage,
    };

    return {
        ...uiHelperContext,
        ui: getUi(uiHelperContext),
        setEmptyEntries: setEmptyEntries(uiHelperContext),
    };
}
