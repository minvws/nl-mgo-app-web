import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';

export interface MgoPositiveInt extends ValueType<'positiveInt'> {
    value: number;
}

export const positiveInt = createTypeParser<number, MgoPositiveInt>((value) => ({
    _type: 'positiveInt',
    value,
}));
