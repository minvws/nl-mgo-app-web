import { expectJson, testUiSchemaContext } from '$test';
import { type Medication } from 'fhir/r3';
import { test } from 'vitest';
import inputMedication01 from './fixtures/zib-Product-01.json';
import { zibProduct } from './zibProduct';

test('parseZibProduct returns the expected output 01', async () => {
    const output = zibProduct.parse(inputMedication01 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/zib-Product-01-output.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = zibProduct.parse(inputMedication01 as Medication);
    const uiSchema = zibProduct.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicationUse-01-uiSchema.snap.json'
    );
});
