import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoDecimal extends PrimitiveValueType<'Decimal', number> {}

export const decimal = createTypeParser<number, MgoDecimal>((value) => ({
    _type: 'Decimal',
    value,
}));
