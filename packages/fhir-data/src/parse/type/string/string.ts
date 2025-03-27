import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoString extends PrimitiveValueType<'String', string> {}

export const string = createTypeParser<string, MgoString>((value) => ({
    _type: 'String',
    value,
}));
