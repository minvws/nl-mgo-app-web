import { faker, testSet } from '$test';
import { expect } from 'vitest';
import * as special from './special';
import { deepReplaceUndefined } from '../../helpers';

testSet('reference', faker.fhir.reference, (data) => {
    const { reference, display } = data;
    const expected = deepReplaceUndefined({
        reference,
        display,
    });
    expect(special.reference(data)).toEqual(expected);
});
