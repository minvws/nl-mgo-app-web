import { expectJson } from '$test';
import { type MedicationStatement } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData from './fixtures/zib-MedicationUse-01.json';
import { uiSchema } from './uiSchema';
import { zibMedicationUse } from './zibMedicationUse';

const zibMedicationUseData = zibMedicationUse.parse(inputFhirData as MedicationStatement);

test('uiSchema returns the expected output', () => {
    const zibMedicationUseUiSchema = uiSchema(zibMedicationUseData);
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicationUse-01-uiSchema.snap.json'
    );
});

test('uiSchema has an undefined label if there is nog medication.display', () => {
    const schema = uiSchema({ ...zibMedicationUseData, medication: undefined });
    expect(schema.label).toBeUndefined();
});
