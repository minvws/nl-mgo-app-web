import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoDecimal = PrimitiveValueType<'decimal', number>;

export const decimal = createTypeParser<number, MgoDecimal>((value) => ({
    _type: 'decimal',
    value,
}));
