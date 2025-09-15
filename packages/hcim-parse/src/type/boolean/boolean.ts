import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoBoolean = PrimitiveValueType<'boolean', boolean>;

export const boolean = createTypeParser<boolean, MgoBoolean>((value) => ({
    _type: 'boolean',
    value,
}));
