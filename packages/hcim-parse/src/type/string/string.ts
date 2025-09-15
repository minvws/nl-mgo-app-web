import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoString = PrimitiveValueType<'string', string>;

export const string = createTypeParser<string, MgoString>((value) => ({
    _type: 'string',
    value,
}));
