import { type UiContext } from './context/index.js';
import { getChildren } from './helpers/index.js';
import { getSpecial } from './special/index.js';
import { getTypes } from './type/index.js';

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
