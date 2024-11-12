import type { MedicationRequest } from 'fhir/r3';
import inputFhirData from './fixtures/zib-MedicationAgreement-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { zibMedicationAgreement } from './zibMedicationAgreement';

test('parseZibMedicationAgreement returns the expected output', () => {
    const output = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-MedicationAgreement-01-output.snap.json'
    );
});
