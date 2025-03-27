import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoInteger64 extends PrimitiveValueType<'Integer64', number> {}

export const integer64 = createTypeParser<number, MgoInteger64>((value) => ({
    _type: 'Integer64',
    value: value,
}));
