import { faker } from '$test';
import { expect, test } from 'vitest';
import { quantity } from '../quantity/quantity';
import * as general from './ratio';

test('ratio', () => {
    const data = faker.fhir.ratio();
    const { numerator, denominator } = data;
    const expected = {
        _type: 'Ratio',
        numerator: quantity(numerator),
        denominator: quantity(denominator),
    };
    expect(general.ratio(data)).toEqual(expected);
});
