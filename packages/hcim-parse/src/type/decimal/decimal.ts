import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoDecimal = PrimitiveValueType<'decimal', number>;

export const decimal = createTypeParser<number, MgoDecimal>((value) => ({
    _type: 'decimal',
    value,
}));
