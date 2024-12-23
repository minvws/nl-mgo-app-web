import { type I18nContext } from '../../i18n';
import { getChildren } from '../helpers';
import { getSpecial } from '../special';
import { getTypes } from '../type';

export function getUi(context: I18nContext) {
    return {
        ...getTypes(context),
        ...getSpecial(context),
        helpers: {
            getChildren,
        },
    };
}

export type Ui = ReturnType<typeof getUi>;
