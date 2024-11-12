import { expectJson } from '$test';
import { test } from 'vitest';
import { type MedicationDispense } from 'fhir/r3';
import inputFhirData from './fixtures/zib-AdministrationAgreement-01.json';
import { uiSchema } from './uiSchema';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';

const zibData = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);

test('uiSchema returns the expected output', () => {
    const zibMedicationUseUiSchema = uiSchema(zibData);
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/zib-AdministrationAgreement-01-uiSchema.snap.json'
    );
});
