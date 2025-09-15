import { faker } from '$test';
import { expect, test } from 'vitest';
import { quantityProps } from '../quantity/quantity.js';
import * as general from './ratio.js';

test('ratio', () => {
    const data = faker.fhir.ratio();
    const { numerator, denominator } = data;
    const expected = {
        _type: 'ratio',
        numerator: numerator && quantityProps(numerator),
        denominator: denominator && quantityProps(denominator),
    };
    expect(general.ratio(data)).toEqual(expected);
});
