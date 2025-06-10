import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoUnsignedInt = PrimitiveValueType<'unsignedInt', number>;

export const unsignedInt = createTypeParser<number, MgoUnsignedInt>((value) => ({
    _type: 'unsignedInt',
    value,
}));
