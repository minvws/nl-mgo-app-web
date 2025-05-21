import { faker } from '$test';
import { expect, test } from 'vitest';
import * as special from './reference';

test('reference', () => {
    const data = faker.fhir.reference();
    const { reference, display } = data;
    const expected = {
        _type: 'reference',
        reference,
        display,
    };
    expect(special.reference(data)).toEqual(expected);
});
