import { faker } from '$test';
import { expect, test } from 'vitest';
import * as format from './date';

test('format dateTime return null for nullish', () => {
    const value = faker.custom.nullish();
    const result = format.dateTime(value);
    expect(result).toEqual(null);
});

test('format dateTime', () => {
    const value = faker.fhir.dateTime();
    const result = format.dateTime(value);
    expect(result).toEqual(`${value}`);
});

test('format date return null for nullish', () => {
    const value = faker.custom.nullish();
    const result = format.date(value);
    expect(result).toEqual(null);
});

test('format date', () => {
    const value = faker.fhir.date();
    const result = format.date(value);
    expect(result).toEqual(`${value}`);
});
