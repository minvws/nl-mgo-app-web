import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoInteger = PrimitiveValueType<'integer', number>;

export const integer = createTypeParser<number, MgoInteger>((value) => ({
    _type: 'integer',
    value,
}));
