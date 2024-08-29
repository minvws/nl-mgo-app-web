import { expect, test } from 'vitest';
import { type MedicationStatement } from '../../fhir';
import { zibMedicationUse } from '../../resources';
import { getUiSchemaJson } from './getUiSchemaJson';
import medicationUse from './fixtures/zib-MedicationUse-01.json';

test('getUiSchemaJson returns the expected output', async () => {
    const zibMedicationUseData = zibMedicationUse.parse(medicationUse as MedicationStatement);

    const MgoMedicationUseJson = JSON.stringify(zibMedicationUseData);
    const uiSchemaJson = getUiSchemaJson(MgoMedicationUseJson, true);

    expect(() => JSON.parse(uiSchemaJson!)).not.toThrow();
    expect(uiSchemaJson).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-uiSchema.snap.json');
});

test('throws if the input is a MGO resource', () => {
    expect(() => getUiSchemaJson('{}')).toThrowError(
        `input does not seem to be a valid MGO Resource. Received MGO resource profile: "undefined"`
    );
});
