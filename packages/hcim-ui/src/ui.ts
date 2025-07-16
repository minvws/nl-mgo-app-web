import { type UiContext } from './context';
import { getChildren } from './helpers';
import { getSpecial } from './special';
import { getTypes } from './type';

export function createUiHelpers(context: UiContext) {
    return {
        ...getTypes(context),
        ...getSpecial(context),
        helpers: {
            getChildren,
        },
    };
}

export type UiHelpers = ReturnType<typeof createUiHelpers>;
