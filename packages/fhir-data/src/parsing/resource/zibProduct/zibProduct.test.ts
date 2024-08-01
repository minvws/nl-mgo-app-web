import expectedOutput01 from './fixtures/zib-Product-01-output.json';
import inputMedication01 from './fixtures/zib-Product-01.json';

import { expect, test } from 'vitest';
import { type Medication } from '../../../fhir';
import { parseZibProduct } from './zibProduct';
import { EMPTY_VALUE } from '../../type';

test('parseZibProduct returns the expected output 01', () => {
    const zibProduct = parseZibProduct(inputMedication01 as Medication);
    expect(zibProduct).toEqual(expectedOutput01);
});

test('returns EMPTY_VALUE if falsy', () => {
    const zibProduct = parseZibProduct(false as unknown as Medication);
    expect(zibProduct).toEqual(EMPTY_VALUE);
});
