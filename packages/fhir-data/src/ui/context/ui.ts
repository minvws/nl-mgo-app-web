import { type I18nContext } from '../../i18n';
import { getChildren } from '../helpers';
import { getSpecial } from '../special';
import { getTypes } from '../type';

export interface UiHelperContext extends I18nContext {
    isSummary?: boolean;
}

export function getUi(context: UiHelperContext) {
    return {
        ...getTypes(context),
        ...getSpecial(context),
        helpers: {
            getChildren,
        },
    };
}

export type Ui = ReturnType<typeof getUi>;
