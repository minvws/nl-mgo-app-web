import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoPositiveInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { positiveInt } from './positiveInt';

test('positiveInt', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value = faker.fhir.unsignedInt() as MgoPositiveInt;
    const result = positiveInt(label, value, options);
    expect(result).toEqual({
        label,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    });
});
