import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDateTime } from '../../../parse/type';
import { format } from '../../format';
import * as primitive from './dateTime';

test('dateTime', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoDateTime = faker.fhir.dateTime();
    const result = primitive.dateTime(label, value, options);
    expect(result).toEqual({
        label,
        type: 'SINGLE_VALUE',
        display: format.dateTime(value),
        ...options,
    });
});
