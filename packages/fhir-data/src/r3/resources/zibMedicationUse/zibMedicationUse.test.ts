import type { MedicationStatement } from 'fhir/r3';
import { expectJson } from '$test';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json';
import { zibMedicationUse } from './zibMedicationUse';

test('parseZibMedicationUse returns the expected output', () => {
    const output = zibMedicationUse.parse(inputFhirData as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibMedicationUseData = zibMedicationUse.parse(inputFhirData as MedicationStatement);
    const zibMedicationUseUiSchema = zibMedicationUse.uiSchema(zibMedicationUseData);
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
