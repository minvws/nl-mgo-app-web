import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDate } from '../../../parse/type';
import { format } from '../../format';
import * as primitive from './date';

test('date', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoDate = faker.fhir.date();
    const result = primitive.date(label, value, options);
    expect(result).toEqual({
        label,
        type: 'SINGLE_VALUE',
        display: format.date(value),
        ...options,
    });
});
