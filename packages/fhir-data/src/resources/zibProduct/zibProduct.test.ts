import expectedOutput01 from './fixtures/zib-Product-01-output.json';
import inputMedication01 from './fixtures/zib-Product-01.json';

import { expect, test } from 'vitest';
import { type Medication } from '../../fhir';
import { parseZibProduct } from './zibProduct';
import { deepReplaceUndefined } from '../../parse/helpers';

test('parseZibProduct returns the expected output 01', () => {
    const zibProduct = deepReplaceUndefined(parseZibProduct(inputMedication01 as Medication));
    expect(zibProduct).toEqual(expectedOutput01);
});
