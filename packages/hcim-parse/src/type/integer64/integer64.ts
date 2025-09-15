import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoInteger64 = PrimitiveValueType<'integer64', number>;

export const integer64 = createTypeParser<number, MgoInteger64>((value) => ({
    _type: 'integer64',
    value: value,
}));
