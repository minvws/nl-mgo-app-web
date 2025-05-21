import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import type { MedicationRequest } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json';
import { zibMedicationAgreement } from './zibMedicationAgreement';

test('01: mgo-resource', async () => {
    const output = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    const zibMedicationUseUiSchema = zibMedicationAgreement.uiSchema(
        mgoResource,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
