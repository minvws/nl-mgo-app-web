import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { EMPTY_VALUE } from '../emptyValue';
import * as special from './special';

test.each(Object.entries(special))(
    'returns EMPTY_VALUE for %s if undefined',
    (_name, parsingFunc) => {
        expect(parsingFunc(undefined)).toBe(EMPTY_VALUE);
    }
);

testSet('reference', faker.fhir.reference, (data) => {
    const { reference, display } = data;
    expect(special.reference(data)).toEqual({
        reference,
        display,
    });
});
