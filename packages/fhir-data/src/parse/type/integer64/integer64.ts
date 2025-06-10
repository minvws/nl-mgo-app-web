import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoInteger64 = PrimitiveValueType<'integer64', number>;

export const integer64 = createTypeParser<number, MgoInteger64>((value) => ({
    _type: 'integer64',
    value: value,
}));
