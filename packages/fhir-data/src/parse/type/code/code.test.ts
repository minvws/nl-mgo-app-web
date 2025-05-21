import { faker } from '$test';
import { expect, test } from 'vitest';
import { code } from './code';

test('code', () => {
    const value = faker.fhir.code();
    expect(code(value)).toEqual({
        _type: 'code',
        value,
    });
});
test('code returns undefined if nullish', () => {
    const value = faker.helpers.arrayElement([null, undefined]);
    expect(code(value)).toBeUndefined();
});
