import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoString = PrimitiveValueType<'string', string>;

export const string = createTypeParser<string, MgoString>((value) => ({
    _type: 'string',
    value,
}));
