import type { MedicationStatement } from 'fhir/r3';
import inputFhirData from './fixtures/zib-MedicationUse-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { zibMedicationUse } from './zibMedicationUse';

test('parseZibMedicationUse returns the expected output', () => {
    const output = zibMedicationUse.parse(inputFhirData as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-output.snap.json');
});
