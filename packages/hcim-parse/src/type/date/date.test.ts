import { faker } from '$test';
import { expect, test } from 'vitest';
import { date } from './date.js';

test('date', () => {
    const value = faker.fhir.date();
    expect(date(value)).toEqual({
        _type: 'date',
        value,
    });
});
