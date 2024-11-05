import { faker } from '$test';
import { expect, test } from 'vitest';
import { format } from '../../format';
import { valueWithMax } from './valueWithMax';

test('valueWithMax', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value = faker.number.int();
    const max = faker.number.int();

    const result = valueWithMax(label, value, max, options);
    expect(result).toEqual({
        label,
        type: 'SINGLE_VALUE',
        display: format.valueWithMaxValue(value, max),
        ...options,
    });
});
