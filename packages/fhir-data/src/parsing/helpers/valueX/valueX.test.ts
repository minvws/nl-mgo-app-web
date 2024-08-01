import { faker } from '$test';
import { expect, test } from 'vitest';
import { EMPTY_VALUE } from '../../type';
import { valueX } from './valueX';
import { boolean } from '../../type/primitive/primitive';
import { codableConcept } from '../../type/general/general';

test('returns EMPTY_VALUE if the element is undefined', () => {
    const value = valueX('valueBoolean', undefined);
    expect(value).toBe(EMPTY_VALUE);
});

test('returns EMPTY_VALUE if the value of the element is undefined', () => {
    const value = valueX('valueBoolean', { valueBoolean: undefined });
    expect(value).toBe(EMPTY_VALUE);
});

test('returns the parsed value for valueBoolean', () => {
    const element = { valueBoolean: faker.datatype.boolean() };
    const value = valueX('valueBoolean', element);
    expect(value).toEqual(boolean(element.valueBoolean));
});

test('returns the parsed value for valueCodeableConcept', () => {
    const element = { valueCodeableConcept: faker.fhir.codableConcept() };
    const value = valueX('valueCodeableConcept', element);
    expect(value).toEqual(codableConcept(element.valueCodeableConcept));
});
