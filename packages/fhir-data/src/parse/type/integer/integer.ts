import { passThrough } from '../../helpers';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoInteger = number & { readonly '': unique symbol };

export const integer = createTypeParser<number, MgoInteger>(passThrough);
