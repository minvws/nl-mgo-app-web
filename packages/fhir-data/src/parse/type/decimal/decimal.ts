import { passThrough } from '../../helpers';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoDecimal = number & { readonly '': unique symbol };

export const decimal = createTypeParser<number, MgoDecimal>(passThrough);
