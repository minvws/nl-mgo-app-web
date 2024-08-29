import { faker } from '$test';
import { expect, test } from 'vitest';
import * as format from './dateTime';

test('format dateTime returns undefined for nullish', () => {
    const value = faker.custom.nullish();
    const result = format.dateTime(value);
    expect(result).toBeUndefined();
});

test('format dateTime', () => {
    const value = faker.fhir.dateTime();
    const result = format.dateTime(value);
    expect(result).toEqual(`${value}`);
});
