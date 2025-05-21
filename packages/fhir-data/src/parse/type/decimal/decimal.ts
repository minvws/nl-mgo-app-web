import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoDecimal extends PrimitiveValueType<'decimal', number> {}

export const decimal = createTypeParser<number, MgoDecimal>((value) => ({
    _type: 'decimal',
    value,
}));
