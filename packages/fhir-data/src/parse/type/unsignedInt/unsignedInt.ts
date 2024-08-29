import { passThrough } from '../../helpers';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoUnsignedInt = number & { readonly '': unique symbol };

export const unsignedInt = createTypeParser<number, MgoUnsignedInt>(passThrough);
