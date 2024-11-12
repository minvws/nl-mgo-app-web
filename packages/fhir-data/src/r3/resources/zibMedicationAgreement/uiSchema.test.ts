import { expectJson } from '$test';
import { test } from 'vitest';
import { type MedicationRequest } from 'fhir/r3';
import inputFhirData from './fixtures/zib-MedicationAgreement-01.json';
import { uiSchema } from './uiSchema';
import { zibMedicationAgreement } from './zibMedicationAgreement';

const zibData = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);

test('uiSchema returns the expected output', () => {
    const zibMedicationUseUiSchema = uiSchema(zibData);
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicationAgreement-01-uiSchema.snap.json'
    );
});
