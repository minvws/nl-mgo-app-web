import inputMedication01 from './fixtures/zib-Product-01.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { type Medication } from 'fhir/r3';
import { test } from 'vitest';
import { zibProduct } from './zibProduct';

test('parseZibProduct returns the expected output 01', () => {
    const output = zibProduct.parse(inputMedication01 as Medication, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Product-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibProduct.parse(inputMedication01 as Medication, faker.custom.i18nContext());
    const uiSchema = zibProduct.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-MedicationUse-01-uiSchema.snap.json');
});
