import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoBoolean = PrimitiveValueType<'boolean', boolean>;

export const boolean = createTypeParser<boolean, MgoBoolean>((value) => ({
    _type: 'boolean',
    value,
}));
