import { expectJson, testUiSchemaContext } from '$test';
import type { MedicationStatement } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json';
import { zibMedicationUse } from './zibMedicationUse';

test('parseZibMedicationUse returns the expected output', () => {
    const output = zibMedicationUse.parse(inputFhirData as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibMedicationUseData = zibMedicationUse.parse(inputFhirData as MedicationStatement);
    const zibMedicationUseUiSchema = zibMedicationUse.uiSchema(
        zibMedicationUseData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
            // useMock: true,
        })
    );
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
