import { faker } from '$test';
import { expect, test } from 'vitest';
import * as format from './code';

test('format codeWithSystem', () => {
    const code = faker.fhir.code();
    const system = faker.internet.url();
    const result = format.codeWithSystem(code, system);
    expect(result).toEqual(`${code} in code systeem ${system}`);
});

test('format codeWithSystem without code', () => {
    const code = null;
    const system = faker.internet.url();
    const result = format.codeWithSystem(code, system);
    expect(result).toEqual(null);
});

test('format codeWithSystem without system', () => {
    const code = faker.fhir.code();
    const system = null;
    const result = format.codeWithSystem(code, system);
    expect(result).toEqual(code);
});
