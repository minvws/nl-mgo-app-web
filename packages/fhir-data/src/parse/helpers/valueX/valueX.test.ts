import { faker } from '$test';
import { expect, test } from 'vitest';
import { valueX } from './valueX';
import { boolean, codeableConcept } from '../../type';

test('returns undefined if value is nullish', () => {
    const element = faker.custom.nullish<{
        valueBoolean: boolean;
    }>();
    const value = valueX(element, 'boolean');
    expect(value).toBeUndefined();
});

test('returns the parsed value for valueBoolean', () => {
    const element = { valueBoolean: faker.datatype.boolean() };
    const value = valueX(element, 'boolean');
    expect(value).toEqual(boolean(element.valueBoolean));
});

test('returns the parsed value for valueCodeableConcept', () => {
    const element = { valueCodeableConcept: faker.fhir.codeableConcept() } as const;
    const value = valueX(element, 'codeableConcept');
    expect(value).toEqual(codeableConcept(element.valueCodeableConcept));
});
