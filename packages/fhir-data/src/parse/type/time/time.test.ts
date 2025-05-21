import { faker } from '$test';
import { expect, test } from 'vitest';
import { time } from './time';

test('time', () => {
    const value = faker.fhir.time();
    expect(time(value)).toEqual({
        _type: 'time',
        value,
    });
});
