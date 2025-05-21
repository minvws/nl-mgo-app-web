import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoBoolean extends PrimitiveValueType<'boolean', boolean> {}

export const boolean = createTypeParser<boolean, MgoBoolean>((value) => ({
    _type: 'boolean',
    value,
}));
