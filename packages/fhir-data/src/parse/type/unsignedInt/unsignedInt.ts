import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoUnsignedInt extends PrimitiveValueType<'UnsignedInt', number> {}

export const unsignedInt = createTypeParser<number, MgoUnsignedInt>((value) => ({
    _type: 'UnsignedInt',
    value,
}));
