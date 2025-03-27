import { faker } from '$test';
import { expect, test } from 'vitest';
import { period } from './period';

test('period', () => {
    const data = faker.fhir.period();
    const { start, end } = data;
    const expected = {
        _type: 'Period',
        start,
        end,
    };
    expect(period(data)).toEqual(expected);
});
