import { passThrough } from '../../helpers';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoInteger64 = number & { readonly '': unique symbol };

export const integer64 = createTypeParser<number, MgoInteger64>(passThrough);
