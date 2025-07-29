import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type MedicationDispense } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibAdministrationAgreement } from './zibAdministrationAgreement.js';

test('01: mgo-resource', async () => {
    const output = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    const zibMedicationUseUiSchema = zibAdministrationAgreement.uiSchema(
        mgoResource,
        testSchemaContext()
    );
    await expectHealthCareUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
