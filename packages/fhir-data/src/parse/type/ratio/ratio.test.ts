import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { quantity } from '../quantity/quantity';
import * as general from './ratio';

testSet('ratio', faker.fhir.ratio, (data) => {
    const { numerator, denominator } = data;
    const expected = {
        numerator: quantity(numerator),
        denominator: quantity(denominator),
    };
    expect(general.ratio(data)).toEqual(expected);
});
