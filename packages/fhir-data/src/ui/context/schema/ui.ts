import { getChildren } from '../../helpers';
import { getSpecial } from '../../special';
import { getTypes } from '../../type';
import { type UiHelperContext } from '../helper/helper';

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
