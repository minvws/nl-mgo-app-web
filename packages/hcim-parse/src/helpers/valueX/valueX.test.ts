import { faker } from '$test';
import { nullish } from '@minvws/mgo-utils/test/shared';
import { expect, test } from 'vitest';
import { boolean, codeableConcept } from '../../type/index.js';
import { valueX } from './valueX.js';

test('returns undefined if value is nullish', () => {
    const element = nullish<{
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

test('returns the parsed value for fooBoolean with custom prefix', () => {
    const element = { fooBoolean: faker.datatype.boolean() };
    const value = valueX(element, 'boolean', 'foo');
    expect(value).toEqual(boolean(element.fooBoolean));
});

test('throws error when parser is not found', () => {
    const element = { valueInvalidType: 'some value' };
    expect(() => valueX(element, 'invalidType' as never)).toThrow(
        'Failed to find parser for invalidType'
    );
});
