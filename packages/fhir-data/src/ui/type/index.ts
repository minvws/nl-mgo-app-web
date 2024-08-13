import * as general from './general/general';
import * as primitive from './primitive/primitive';
import * as special from './special/special';

export const ui = {
    ...primitive,
    ...general,
    ...special,
};
