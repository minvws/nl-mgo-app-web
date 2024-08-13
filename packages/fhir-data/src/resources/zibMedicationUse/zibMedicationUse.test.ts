import type { MedicationStatement } from '../../fhir';
import inputFhirData from './fixtures/zib-MedicationUse-01.json';

import { expect, test } from 'vitest';
import { parseZibMedicationUse } from './zibMedicationUse';

test('parseZibMedicationUse returns the expected output', () => {
    const zibMedicationUse = parseZibMedicationUse(inputFhirData as MedicationStatement);
    const json = JSON.stringify(zibMedicationUse, null, 4);
    expect(json).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-output.snap.json');
});
