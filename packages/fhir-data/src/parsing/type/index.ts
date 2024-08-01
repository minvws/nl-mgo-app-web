import * as general from './general/general';
import * as primitive from './primitive/primitive';
import * as special from './special/special';

export { EMPTY_VALUE } from './emptyValue';

/**
 * Functions for parsing FHIR data types,
 * @see: https://build.fhir.org/datatypes.html
 */
export const parse = {
    ...primitive,
    ...general,
    ...special,
};
