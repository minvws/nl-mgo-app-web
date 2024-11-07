import { expect, test } from 'vitest';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

test('returns first letter uppercase', () => {
    const string = 'test';
    const result = capitalizeFirstLetter(string);

    expect(result).toEqual('Test');
});

test("returns first letter uppercase and don't change other chars", () => {
    const string = 'codeableConcept';
    const result = capitalizeFirstLetter(string);

    expect(result).toEqual('CodeableConcept');
});

test('returns empty string if string is empty', () => {
    const string = '';
    const result = capitalizeFirstLetter(string);

    expect(result).toEqual(string);
});
