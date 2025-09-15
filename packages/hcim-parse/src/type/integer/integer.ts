import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoInteger = PrimitiveValueType<'integer', number>;

export const integer = createTypeParser<number, MgoInteger>((value) => ({
    _type: 'integer',
    value,
}));
