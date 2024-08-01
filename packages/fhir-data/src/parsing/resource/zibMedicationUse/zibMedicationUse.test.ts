import type { MedicationStatement } from '../../../fhir';
import inputFhirData from './fixtures/zib-MedicationUse-01.json';
import expectedOutput from './fixtures/zib-MedicationUse-01-output.json';

import { expect, test } from 'vitest';
import { parseZibMedicationUse } from './zibMedicationUse';
import { EMPTY_VALUE } from '../../type';

test('parseZibMedicationUse returns the expected output', () => {
    const zibMedicationUse = parseZibMedicationUse(inputFhirData as MedicationStatement);
    expect(zibMedicationUse).toEqual(expectedOutput);
});

test('returns EMPTY_VALUE if falsy', () => {
    const zibMedicationUse = parseZibMedicationUse(false as unknown as MedicationStatement);
    expect(zibMedicationUse).toEqual(EMPTY_VALUE);
});
