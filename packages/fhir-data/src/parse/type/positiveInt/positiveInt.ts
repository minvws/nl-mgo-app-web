import { passThrough } from '../../helpers';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoPositiveInt = number & { readonly '': unique symbol };

export const positiveInt = createTypeParser<number, MgoPositiveInt>(passThrough);
