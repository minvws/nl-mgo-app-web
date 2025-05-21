import { faker } from '$test';
import { expect, test } from 'vitest';
import { date } from './date';

test('date', () => {
    const value = faker.fhir.date();
    expect(date(value)).toEqual({
        _type: 'date',
        value,
    });
});
