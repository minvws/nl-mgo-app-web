import { faker } from '$test';
import { expect, test } from 'vitest';
import { code } from './code';

test('code', () => {
    const value = faker.fhir.code();
    expect(code(value)).toBe(value);
});
