import { faker } from '$test';
import { expect, test } from 'vitest';
import { keyX } from './keyX';
import { codeableConcept } from '../../type/general/general';
import { boolean } from '../../type/primitive/primitive';

test('returns null if value is nullish', () => {
    const element = faker.custom.nullish<{
        valueBoolean: boolean;
    }>();
    const value = keyX(element, 'value', 'boolean');
    expect(value).toEqual(null);
});

test('returns the parsed value for valueBoolean', () => {
    const element = { valueBoolean: faker.datatype.boolean() };
    const value = keyX(element, 'value', 'boolean');
    expect(value).toEqual(boolean(element.valueBoolean));
});

test('returns the parsed value for valueCodeableConcept', () => {
    const element = { valueCodeableConcept: faker.fhir.codeableConcept() } as const;
    const value = keyX(element, 'value', 'codeableConcept');
    expect(value).toEqual(codeableConcept(element.valueCodeableConcept));
});
