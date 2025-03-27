import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';

export interface MgoPositiveInt extends ValueType<'PositiveInt'> {
    value: number;
}

export const positiveInt = createTypeParser<number, MgoPositiveInt>((value) => ({
    _type: 'PositiveInt',
    value,
}));
