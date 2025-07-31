import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type MedicationRequest } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibMedicationAgreement } from './zibMedicationAgreement.js';

test('01: mgo-resource', async () => {
    const output = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    const zibMedicationUseUiSchema = zibMedicationAgreement.uiSchema(
        mgoResource,
        testSchemaContext()
    );
    await expectHealthCareUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
