import { expectJson } from '$test';
import { test } from 'vitest';
import { type Medication } from 'fhir/r3';
import inputMedication01 from './fixtures/zib-Product-01.json';
import { zibProduct } from './zibProduct';

const zibProductData = zibProduct.parse(inputMedication01 as Medication);

test('uiSchema returns the expected output', () => {
    const uiSchema = zibProduct.uiSchema(zibProductData);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-uiSchema.snap.json');
});
