import { faker } from '$test';
import { expect, test } from 'vitest';
import * as format from './date';

test('format date returns undefined for nullish', () => {
    const value = faker.custom.nullish();
    const result = format.date(value);
    expect(result).toBeUndefined();
});

test('format date', () => {
    const value = faker.fhir.date();
    const result = format.date(value);
    expect(result).toEqual(`${value}`);
});
