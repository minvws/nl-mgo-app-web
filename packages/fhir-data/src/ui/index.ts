import * as type from './type';
import * as special from './special';
import { getChildren } from './helpers';

export const ui = {
    ...type,
    ...special,
    helpers: {
        getChildren,
    },
};

export type { UiSchema, UiSchemaGroup } from './types';
