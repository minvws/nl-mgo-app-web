import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { period } from './period';
import { dateTime } from '../dateTime/dateTime';

testSet('period', faker.fhir.period, (data) => {
    const { start, end } = data;
    const expected = {
        start: dateTime(start),
        end: dateTime(end),
    };
    expect(period(data)).toEqual(expected);
});
