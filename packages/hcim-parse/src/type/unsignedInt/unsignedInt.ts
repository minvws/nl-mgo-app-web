import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoUnsignedInt = PrimitiveValueType<'unsignedInt', number>;

export const unsignedInt = createTypeParser<number, MgoUnsignedInt>((value) => ({
    _type: 'unsignedInt',
    value,
}));
