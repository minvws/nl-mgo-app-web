import { faker } from '$test';
import { expect, test } from 'vitest';
import { dateTime } from './dateTime';

test('dateTime', () => {
    const value = faker.fhir.dateTime();
    expect(dateTime(value)).toEqual({
        _type: 'dateTime',
        value,
    });
});
