import { faker } from '$test';
import { nullish } from '@minvws/mgo-utils/test/shared';
import { expect, test } from 'vitest';
import { boolean, codeableConcept } from '../../type/index.js';
import { oneOfValueX } from './oneOfValueX.js';

test('returns empty object if value is nullish', () => {
    const element = nullish<{
        valueBoolean: boolean;
    }>();
    const value = oneOfValueX(element, ['boolean']);
    expect(value).toEqual({});
});

test('returns the parsed value for valueBoolean', () => {
    const element = {
        valueString: null,
        valueBoolean: faker.datatype.boolean(),
    };
    const value = oneOfValueX(element, ['boolean', 'string']);
    expect(value).toEqual({
        valueBoolean: boolean(element.valueBoolean),
    });
});

test('returns the parsed value for valueCodeableConcept', () => {
    const element = {
        valueString: null,
        valueCodeableConcept: faker.fhir.codeableConcept(),
    };
    const value = oneOfValueX(element, ['codeableConcept', 'string']);
    expect(value).toEqual({
        valueCodeableConcept: codeableConcept(element.valueCodeableConcept),
    });
});

test('returns empty object when nu value is filled', () => {
    const element = {
        valueString: null,
        valueBoolean: null,
    };
    const value = oneOfValueX(element, ['boolean', 'string']);
    expect(value).toEqual({});
});

test('returns the parsed value for fooBoolean with custom prefix', () => {
    const element = {
        fooString: null,
        fooBoolean: faker.datatype.boolean(),
    };
    const value = oneOfValueX(element, ['boolean', 'string'], 'foo');
    expect(value).toEqual({
        fooBoolean: boolean(element.fooBoolean),
    });
});

test('returns empty object when no value is found with a custom prefix', () => {
    const element = {
        valueString: faker.lorem.sentence(),
        valueBoolean: faker.datatype.boolean(),
    };
    const value = oneOfValueX(element, ['boolean', 'string'], 'foo');
    expect(value).toEqual({});
});
