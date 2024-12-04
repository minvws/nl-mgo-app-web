import type { MedicationDispense } from 'fhir/r3';
import inputFhirData from './fixtures/fhir-resource.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';
import { uiSchema } from './uiSchema';

test('parseZibAdministrationAgreement returns the expected output', () => {
    const output = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    const zibMedicationUseUiSchema = uiSchema(zibData);
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
