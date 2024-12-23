import { createI18nContext, type IntlOptions } from '../../i18n';
import { setEmptyEntries } from '../helpers';
import { type UiSchemaContext } from '../types';
import { getUi } from './ui';

export function createUiSchemaContext(options: IntlOptions): UiSchemaContext {
    const i18nContext = createI18nContext(options);

    return {
        ...i18nContext,
        ui: getUi(i18nContext),
        setEmptyEntries: setEmptyEntries(i18nContext),
    };
}
