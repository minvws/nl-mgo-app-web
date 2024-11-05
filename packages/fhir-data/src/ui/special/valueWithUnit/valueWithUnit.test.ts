import { faker } from '$test';
import { expect, test } from 'vitest';
import { format } from '../../format';
import { valueWithUnit } from './valueWithUnit';

test('valueWithUnit', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value = faker.number.int();
    const unit = faker.lorem.word();

    const result = valueWithUnit(label, value, unit, options);
    expect(result).toEqual({
        label,
        type: 'SINGLE_VALUE',
        display: format.valueWithUnit(value, unit),
        ...options,
    });
});
